import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

// 1. Grab the port from the URL (e.g., ?port=1235), default to 1234
const urlParams = new URLSearchParams(window.location.search);
const port = urlParams.get("port") || "1234";

// 2. Construct the dynamic WebSocket URL
const wsUrl = `ws://localhost:${port}`;

const doc = new Y.Doc();
const provider = new WebsocketProvider(wsUrl, "coedit-room", doc);

export { doc, provider };