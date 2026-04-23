/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';var e=require("@lexical/react/LexicalComposerContext"),f=require("lexical"),g=require("react"),h=Object.create(null);if(g)for(var n in g)h[n]=g[n];h.default=g;let p="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement,q=p?g.useLayoutEffect:g.useEffect,r={tag:"history-merge"};
function t(a,c){if(null!==c)if(void 0===c)a.update(()=>{var b=f.$getRoot();if(b.isEmpty()){let d=f.$createParagraphNode();b.append(d);b=p?document.activeElement:null;(null!==f.$getSelection()||null!==b&&b===a.getRootElement())&&d.select()}},r);else if(null!==c)switch(typeof c){case "string":let b=a.parseEditorState(c);a.setEditorState(b,r);break;case "object":a.setEditorState(c,r);break;case "function":a.update(()=>{f.$getRoot().isEmpty()&&c(a)},r)}}
exports.LexicalComposer=function({initialConfig:a,children:c}){let b=g.useMemo(()=>{const {theme:d,namespace:k,editor__DEPRECATED:u,nodes:v,onError:w,editorState:x,html:y}=a,z=e.createLexicalComposerContext(null,d);let l=u||null;if(null===l){const m=f.createEditor({editable:a.editable,html:y,namespace:k,nodes:v,onError:A=>w(A,m),theme:d});t(m,x);l=m}return[l,z]},[]);q(()=>{let d=a.editable,[k]=b;k.setEditable(void 0!==d?d:!0)},[]);return h.createElement(e.LexicalComposerContext.Provider,{value:b},
c)}
