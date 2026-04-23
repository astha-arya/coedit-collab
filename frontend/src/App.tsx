import { Editor } from "./Editor";
import "./index.css";

export default function App() {
  return (
    <main className="app">
      <header className="app-header">
        <span className="logo">CoEdit</span>
        <div className="live-badge">
          <div className="pulse-dot"></div>
          LIVE SYNC
        </div>
      </header>
      <Editor />
    </main>
  );
}