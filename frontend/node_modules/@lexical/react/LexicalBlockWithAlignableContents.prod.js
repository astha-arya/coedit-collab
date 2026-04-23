/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';var a=require("@lexical/react/LexicalComposerContext"),c=require("@lexical/react/LexicalDecoratorBlockNode"),k=require("@lexical/react/useLexicalNodeSelection"),m=require("@lexical/utils"),n=require("lexical"),p=require("react"),w=Object.create(null);if(p)for(var x in p)w[x]=p[x];w.default=p;
exports.BlockWithAlignableContents=function({children:y,format:q,nodeKey:f,className:r}){let [g]=a.useLexicalComposerContext(),[d,t,u]=k.useLexicalNodeSelection(f),v=p.useRef(null),l=p.useCallback(b=>d&&n.$isNodeSelection(n.$getSelection())&&(b.preventDefault(),b=n.$getNodeByKey(f),n.$isDecoratorNode(b))?(b.remove(),!0):!1,[d,f]);p.useEffect(()=>m.mergeRegister(g.registerCommand(n.FORMAT_ELEMENT_COMMAND,b=>{if(d){var h=n.$getSelection();if(n.$isNodeSelection(h)){var e=n.$getNodeByKey(f);c.$isDecoratorBlockNode(e)&&
e.setFormat(b)}else if(n.$isRangeSelection(h)){h=h.getNodes();for(e of h)c.$isDecoratorBlockNode(e)?e.setFormat(b):m.$getNearestBlockElementAncestorOrThrow(e).setFormat(b)}return!0}return!1},n.COMMAND_PRIORITY_LOW),g.registerCommand(n.CLICK_COMMAND,b=>b.target===v.current?(b.preventDefault(),b.shiftKey||u(),t(!d),!0):!1,n.COMMAND_PRIORITY_LOW),g.registerCommand(n.KEY_DELETE_COMMAND,l,n.COMMAND_PRIORITY_LOW),g.registerCommand(n.KEY_BACKSPACE_COMMAND,l,n.COMMAND_PRIORITY_LOW)),[u,g,d,f,l,t]);return w.createElement("div",
{className:[r.base,d?r.focus:null].filter(Boolean).join(" "),ref:v,style:{textAlign:q?q:void 0}},y)}
