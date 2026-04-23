import { Editor } from "./Editor";
import "./index.css";

export default function App() {
  return (
    <main className="app">
      <header className="app-header">
        <span className="logo">CoEdit</span>
        <span className="badge">Phase 1 · Local Sync</span>
      </header>
      <Editor />
    </main>
  );
}