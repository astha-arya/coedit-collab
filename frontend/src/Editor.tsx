import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"; // FIX: Default import instead of named
import { CollaborativePlugin } from "./plugins/CollaborativePlugin";

const theme = {};

const onError = (error: Error) => {
  console.error(error);
};

export function Editor() {
  return (
    <LexicalComposer initialConfig={{ namespace: "CoEdit", theme, onError }}>
      <div className="editor-container">
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<div className="editor-placeholder">Start writing…</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <CollaborativePlugin />
      </div>
    </LexicalComposer>
  );
}