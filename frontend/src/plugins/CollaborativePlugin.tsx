import { CollaborationPlugin } from "@lexical/react/LexicalCollaborationPlugin";
import { doc, provider } from "../collaboration";

export function CollaborativePlugin() {
  return (
    <CollaborationPlugin
      id="coedit-root"
      // @ts-ignore - Lexical's strict Provider type slightly mismatches y-websocket's types, but works perfectly at runtime.
      providerFactory={(id, yjsDocMap) => {
        yjsDocMap.set(id, doc);
        return provider;
      }}
      shouldBootstrap={false}
    />
  );
}