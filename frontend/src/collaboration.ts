import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

// 1. Define the local URL (for your laptop)
const port = new URLSearchParams(window.location.search).get("port") ?? "1234";
const localUrl = `ws://localhost:${port}`;

// 2. Check for the production URL (from Vercel)
// Vite securely injects this when building for production
const prodUrl = import.meta.env.VITE_WS_URL;

// 3. Automatically switch: Use Production if it exists, otherwise use Local
const wsUrl = prodUrl ? prodUrl : localUrl;

export const doc = new Y.Doc();

export const provider = new WebsocketProvider(
  wsUrl,
  "coedit-prod-room-1",
  doc
);

const hue = Math.floor(Math.random() * 360);
export const localUser = {
  name: `User ${Math.floor(Math.random() * 9000) + 1000}`,
  color: `hsl(${hue}, 80%, 60%)`,
};

provider.awareness.setLocalStateField("user", localUser);