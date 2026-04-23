import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

const port = new URLSearchParams(window.location.search).get("port") ?? "1234";

export const doc = new Y.Doc();
export const provider = new WebsocketProvider(
  `ws://localhost:${port}`,
  "coedit-room",
  doc
);

const hue = Math.floor(Math.random() * 360);
export const localUser = {
  name: `User ${Math.floor(Math.random() * 9000) + 1000}`,
  color: `hsl(${hue}, 80%, 60%)`,
};

provider.awareness.setLocalStateField("user", localUser);