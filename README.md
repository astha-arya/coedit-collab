# 📝 CoEdit 

> A highly scalable, real-time collaborative rich-text editor powered by CRDTs, WebSockets, and Redis Pub/Sub.

**[Live Demo](https://coedit-collab.vercel.app)**

## 🚀 Overview

CoEdit is a Notion-style, real-time collaborative document editor. Rather than relying on traditional Operational Transformation (OT), it utilizes **Conflict-free Replicated Data Types (CRDTs)** via `Yjs` to ensure mathematical eventual consistency across all connected clients. 

To solve the WebSocket single-server bottleneck, the backend is horizontally scaled using an **Upstash Redis Pub/Sub** architecture, allowing cursors and document updates to seamlessly sync across distributed server instances.

## ✨ Key Features

* **Real-Time CRDT Sync:** Flawless multi-user editing with zero merge conflicts, powered by Yjs.
* **Distributed Awareness:** Live remote cursors, overlapping avatars, and user presence tracking.
* **Horizontal Scalability:** WebSockets are decoupled using Redis Pub/Sub, allowing the backend node server to scale infinitely without dropping peer connections.
* **Notion-Style UI:** Deeply polished, custom-styled Lexical editor with sticky toolbars and premium typography.
* **Mobile-Optimized:** Custom fixes to bypass standard mobile keyboard IME composition race-conditions with real-time sockets.

---

## 🛠️ Tech Stack

**Frontend (Client)**
* **Framework:** React + Vite + TypeScript
* **Rich Text Engine:** Lexical (by Meta)
* **Collaboration:** Yjs + `y-websocket`
* **Deployment:** Vercel

**Backend (Server)**
* **Runtime:** Node.js + Express + TypeScript
* **State Management:** Yjs Document State
* **Database / Scaling:** Upstash Serverless Redis (Pub/Sub) + MongoDB
* **Deployment:** Render

---

## 🧠 Architecture & Challenges Solved

### 1. The Distributed WebSocket Problem
Standard WebSockets trap "awareness" (cursors) inside the memory of a single server. If User A connects to Server 1, and User B connects to Server 2, they cannot see each other. 
* **Solution:** Implemented a Redis Pub/Sub layer. All Yjs binary updates are intercepted at the server level, published to a Redis channel, and broadcasted to all active server nodes simultaneously. 

### 2. Mobile Keyboard Composition (IME) Race Conditions
Mobile devices (iOS/Android) do not send individual keystrokes; they hold text in a "composition" state for predictive text. This aggressively conflicts with real-time CRDT syncs attempting to broadcast every millisecond, freezing the mobile Backspace key.
* **Solution:** Decoupled local editor history from the global Yjs state, bypassing the DOM-level composition conflict and allowing smooth mobile typing.

---

## 💻 Local Development

### Prerequisites
* Node.js (v18+)
* A local Redis instance or Upstash cloud URL
* MongoDB URI

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/astha-arya/coedit-collab.git
cd coedit-collab
```

---

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file inside the **backend** folder:

```env
PORT=10000
MONGO_URI=your_mongodb_connection_string
REDIS_URL=rediss://default:your_upstash_password@your_upstash_url:6379
```

---

### 3. Setup Frontend
```bash
cd ../frontend
npm install
```

Create a `.env.local` file inside the **frontend** folder:

```env
VITE_WS_URL=ws://localhost:10000
```

---

## ▶️ Running the App

Open **two terminals in VS Code**:

### Terminal 1 (Backend)
```bash
cd backend
npm run dev
```

### Terminal 2 (Frontend)
```bash
cd frontend
npm run dev
```

---

## 🌐 Usage

Open:
```
http://localhost:5173
```

Open it in **two browser windows** to test real-time collaboration.