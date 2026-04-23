/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import{useLexicalComposerContext as e}from"@lexical/react/LexicalComposerContext";import{$isDecoratorBlockNode as r}from"@lexical/react/LexicalDecoratorBlockNode";import{useLexicalNodeSelection as t}from"@lexical/react/useLexicalNodeSelection";import{mergeRegister as o,$getNearestBlockElementAncestorOrThrow as i}from"@lexical/utils";import{$isNodeSelection as a,$getSelection as l,$getNodeByKey as m,$isDecoratorNode as n,FORMAT_ELEMENT_COMMAND as c,$isRangeSelection as s,COMMAND_PRIORITY_LOW as f,CLICK_COMMAND as u,KEY_DELETE_COMMAND as d,KEY_BACKSPACE_COMMAND as p}from"lexical";import*as x from"react";import{useRef as g,useCallback as C,useEffect as v}from"react";function N({children:N,format:y,nodeKey:D,className:F}){const[L]=e(),[h,B,K]=t(D),b=g(null),j=C((e=>{if(h&&a(l())){e.preventDefault();const r=m(D);if(n(r))return r.remove(),!0}return!1}),[h,D]);return v((()=>o(L.registerCommand(c,(e=>{if(h){const t=l();if(a(t)){const t=m(D);r(t)&&t.setFormat(e)}else if(s(t)){const o=t.getNodes();for(const t of o)if(r(t))t.setFormat(e);else{i(t).setFormat(e)}}return!0}return!1}),f),L.registerCommand(u,(e=>e.target===b.current&&(e.preventDefault(),e.shiftKey||K(),B(!h),!0)),f),L.registerCommand(d,j,f),L.registerCommand(p,j,f))),[K,L,h,D,j,B]),x.createElement("div",{className:[F.base,h?F.focus:null].filter(Boolean).join(" "),ref:b,style:{textAlign:y||void 0}},N)}export{N as BlockWithAlignableContents};
