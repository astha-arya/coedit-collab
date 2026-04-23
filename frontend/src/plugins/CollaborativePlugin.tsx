import { CollaborationPlugin } from "@lexical/react/LexicalCollaborationPlugin";
import * as Y from "yjs";
import { doc, provider, localUser } from "../collaboration";

export function CollaborativePlugin(): JSX.Element {
  return (
    <CollaborationPlugin
      id="coedit-root"
      providerFactory={(id: string, yjsDocMap: Map<string, Y.Doc>) => {
        yjsDocMap.set(id, doc);
        return provider as any; // <-- THIS "as any" FIXES THE RED LINE
      }}
      shouldBootstrap={false}
      username={localUser.name}
      cursorColor={localUser.color}
    />
  );
}