import "dotenv/config";
import express from "express";
import http from "http";
import { WebSocketServer, WebSocket } from "ws";
import * as Y from "yjs";
import Redis from "ioredis";
// @ts-ignore
import { setupWSConnection, getYDoc, setPersistence } from "y-websocket/bin/utils";
import { connectDB, Room } from "./db.js";

const REDIS_URL = process.env.REDIS_URL ?? "redis://localhost:6379";
const CHANNEL = "coedit-updates";
const PORT = +(process.env.PORT ?? 1234);
const DEBOUNCE_MS = 10_000;
const REDIS_ORIGIN = Symbol("redis");

// ---------------------------------------------------------------------------
// Redis
// ---------------------------------------------------------------------------

const pub = new Redis(REDIS_URL);
const sub = new Redis(REDIS_URL);

pub.on("error", (e) => console.error("[redis:pub]", e));
sub.on("error", (e) => console.error("[redis:sub]", e));

// ---------------------------------------------------------------------------
// Persistence (setPersistence)
// ---------------------------------------------------------------------------

// Debounce timers keyed by roomId — cleared and reset on every doc update.
// Debounce timers keyed by roomId — cleared and reset on every doc update.
const saveTimers = new Map<string, ReturnType<typeof setTimeout>>();

function scheduleSave(roomId: string, ydoc: Y.Doc): void {
  const existing = saveTimers.get(roomId);
  if (existing) clearTimeout(existing);

  saveTimers.set(
    roomId,
    setTimeout(async () => {
      saveTimers.delete(roomId);
      try {
        const content = Buffer.from(Y.encodeStateAsUpdate(ydoc));
        
        // THE SHIELD: Prevent 2-byte wipes
        if (content.byteLength <= 2) {
          console.log(`[mongo] Shield blocked 2B empty save for room=${roomId}`);
          return;
        }

        await Room.findOneAndUpdate(
          { roomId },
          { content },
          { upsert: true, new: true }
        );
        console.log(`[mongo] saved room=${roomId} (${content.byteLength}B)`);
      } catch (e) {
        console.error(`[mongo] save failed room=${roomId}`, e);
      }
    }, DEBOUNCE_MS)
  );
}

setPersistence({
  async bindState(roomId: string, ydoc: Y.Doc): Promise<void> {
    const doc = await Room.findOne({ roomId });
    if (doc?.content) {
      try {
        const rawBuffer = Buffer.isBuffer(doc.content) 
          ? doc.content 
          : (doc.content as any).buffer || doc.content;

        Y.applyUpdate(ydoc, new Uint8Array(rawBuffer));
        console.log(`[mongo] restored room=${roomId} (${rawBuffer.byteLength}B)`);
      } catch (e) {
        console.error(`[mongo] Failed to parse document for room=${roomId}.`, e);
      }
    }

    ydoc.on("update", (_update: Uint8Array, origin: unknown) => {
      if (origin === REDIS_ORIGIN) return;
      scheduleSave(roomId, ydoc);
    });
  },

  async writeState(roomId: string, ydoc: Y.Doc): Promise<void> {
    const timer = saveTimers.get(roomId);
    if (timer) {
      clearTimeout(timer);
      saveTimers.delete(roomId);
    }
    try {
      const content = Buffer.from(Y.encodeStateAsUpdate(ydoc));
      
      // THE SHIELD: Prevent 2-byte wipes on disconnect
      if (content.byteLength <= 2) {
        console.log(`[mongo] Shield blocked 2B disconnect wipe for room=${roomId}`);
        return;
      }

      await Room.findOneAndUpdate({ roomId }, { content }, { upsert: true });
      console.log(`[mongo] flushed room=${roomId} on disconnect (${content.byteLength}B)`);
    } catch (e) {
      console.error(`[mongo] flush failed room=${roomId}`, e);
    }
  },
});

// ---------------------------------------------------------------------------
// HTTP + WebSocket server
// ---------------------------------------------------------------------------

const instrumentedRooms = new Set<string>();

function roomFromRequest(req: http.IncomingMessage): string {
  return (req.url ?? "/").slice(1).split("?")[0] || "default";
}

function ensureRoomPublisher(room: string): void {
  if (instrumentedRooms.has(room)) return;
  instrumentedRooms.add(room);

  const ydoc: Y.Doc = getYDoc(room);

  ydoc.on("update", (update: Uint8Array, origin: unknown) => {
    if (origin === REDIS_ORIGIN) return;
    pub
      .publish(CHANNEL, Buffer.from(update))
      .catch((e) => console.error("[redis:publish]", e));
  });
}

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.get("/health", (_, res) => res.json({ status: "ok" }));

wss.on("connection", (ws: WebSocket, req: http.IncomingMessage) => {
  setupWSConnection(ws, req);
  ensureRoomPublisher(roomFromRequest(req));
});

sub.subscribe(CHANNEL, (err) => {
  if (err) {
    console.error("[redis:subscribe]", err);
    process.exit(1);
  }
  console.log(`[redis] subscribed → ${CHANNEL}`);
});

sub.on("messageBuffer", (_channel: Buffer, message: Buffer) => {
  const update = new Uint8Array(message);

  for (const room of instrumentedRooms) {
    Y.applyUpdate(getYDoc(room), update, REDIS_ORIGIN);
  }

  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
});

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`CoEdit listening on :${PORT}`);
  });
}

main().catch((e) => {
  console.error("[boot] fatal", e);
  process.exit(1);
});