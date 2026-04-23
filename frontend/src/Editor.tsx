import { useCallback, useEffect, useRef, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import {
  FORMAT_TEXT_COMMAND,
  TextFormatType,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_NORMAL,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  ListItemNode,
} from "@lexical/list";
import { CollaborativePlugin } from "./plugins/CollaborativePlugin";
import { provider } from "./collaboration";


// Types

interface AwarenessUser {
  name: string;
  color: string;
}

interface AwarenessState {
  user?: AwarenessUser;
}

interface ToolbarState {
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

// Awareness pill strip

function AwarenessPills(): JSX.Element {
  const [peers, setPeers] = useState<AwarenessUser[]>([]);

  useEffect(() => {
    const update = () => {
      const users: AwarenessUser[] = [];
      provider.awareness.getStates().forEach((state: AwarenessState, clientId: number) => {
        if (clientId !== provider.awareness.clientID && state.user) {
          users.push(state.user);
        }
      });
      setPeers(users);
    };

    provider.awareness.on("change", update);
    update();
    return () => provider.awareness.off("change", update);
  }, []);

  if (peers.length === 0) return <></>;

  return (
    <div className="awareness-strip">
      {peers.map((u, i) => (
        <span
          key={i}
          className="awareness-pill"
          style={{ "--pill-color": u.color } as React.CSSProperties}
          title={u.name} // <-- HOVER REVEALS FULL NAME
        >
          {u.name.charAt(0).toUpperCase()} {/* <-- GRABS ONLY THE FIRST LETTER */}
        </span>
      ))}
    </div>
  );
}

// Toolbar

interface ToolbarButtonProps {
  active?: boolean;
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}

function ToolbarButton({ active, title, onClick, children }: ToolbarButtonProps) {
  return (
    <button
      className={`toolbar-btn${active ? " active" : ""}`}
      title={title}
      onMouseDown={(e) => {
        e.preventDefault(); // prevent editor blur
        onClick();
      }}
    >
      {children}
    </button>
  );
}

function Toolbar(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [state, setState] = useState<ToolbarState>({
    bold: false,
    italic: false,
    underline: false,
  });

  const updateState = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;
      setState({
        bold: selection.hasFormat("bold"),
        italic: selection.hasFormat("italic"),
        underline: selection.hasFormat("underline"),
      });
    });
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => { updateState(); return false; },
      COMMAND_PRIORITY_NORMAL
    );
  }, [editor, updateState]);

  const format = (fmt: TextFormatType) =>
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, fmt);

  return (
    <div className="toolbar">
      <ToolbarButton active={state.bold} title="Bold (⌘B)" onClick={() => format("bold")}>
        <strong>B</strong>
      </ToolbarButton>
      <ToolbarButton active={state.italic} title="Italic (⌘I)" onClick={() => format("italic")}>
        <em>I</em>
      </ToolbarButton>
      <ToolbarButton active={state.underline} title="Underline (⌘U)" onClick={() => format("underline")}>
        <span style={{ textDecoration: "underline" }}>U</span>
      </ToolbarButton>

      <span className="toolbar-divider" />

      <ToolbarButton title="Bulleted list" onClick={() =>
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
      }>
        <ListIcon type="ul" />
      </ToolbarButton>
      <ToolbarButton title="Numbered list" onClick={() =>
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
      }>
        <ListIcon type="ol" />
      </ToolbarButton>
    </div>
  );
}

function ListIcon({ type }: { type: "ul" | "ol" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      {type === "ul" ? (
        <>
          <circle cx="2" cy="4" r="1.5" fill="currentColor" />
          <circle cx="2" cy="8" r="1.5" fill="currentColor" />
          <circle cx="2" cy="12" r="1.5" fill="currentColor" />
        </>
      ) : (
        <>
          <text x="0.5" y="5.5" fontSize="5" fill="currentColor" fontFamily="monospace">1.</text>
          <text x="0.5" y="9.5" fontSize="5" fill="currentColor" fontFamily="monospace">2.</text>
          <text x="0.5" y="13.5" fontSize="5" fill="currentColor" fontFamily="monospace">3.</text>
        </>
      )}
      <rect x="6" y="3" width="9" height="2" rx="1" fill="currentColor" />
      <rect x="6" y="7" width="9" height="2" rx="1" fill="currentColor" />
      <rect x="6" y="11" width="9" height="2" rx="1" fill="currentColor" />
    </svg>
  );
}

// Editor

const theme = {
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    underline: "editor-text-underline",
  },
  list: {
    ul: "editor-list-ul",
    ol: "editor-list-ol",
    listitem: "editor-listitem",
  },
};

const onError = (error: Error) => console.error(error);

export function Editor() {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: "CoEdit",
        theme,
        onError,
        nodes: [ListNode, ListItemNode],
      }}
    >
      <div className="editor-shell">
        <AwarenessPills />
        <Toolbar />
        <div className="editor-container">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<div className="editor-placeholder">Start writing…</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
      </div>
      <ListPlugin />
      <CollaborativePlugin />
    </LexicalComposer>
  );
}