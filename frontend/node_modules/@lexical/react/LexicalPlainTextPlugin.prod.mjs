/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import{useLexicalComposerContext as e}from"@lexical/react/LexicalComposerContext";import t from"@lexical/react/useLexicalEditable";import*as r from"react";import{useLayoutEffect as o,useEffect as n,useState as c,useMemo as i,Suspense as l}from"react";import{$canShowPlaceholderCurry as a}from"@lexical/text";import{mergeRegister as m}from"@lexical/utils";import{flushSync as u,createPortal as s}from"react-dom";import{registerDragonSupport as f}from"@lexical/dragon";import{registerPlainText as d}from"@lexical/plain-text";const p="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement?o:n;function E(e){return e.getEditorState().read(a(e.isComposing()))}function x({contentEditable:t,placeholder:o,ErrorBoundary:a}){const[E]=e(),x=function(e,t){const[o,a]=c((()=>e.getDecorators()));return p((()=>e.registerDecoratorListener((e=>{u((()=>{a(e)}))}))),[e]),n((()=>{a(e.getDecorators())}),[e]),i((()=>{const n=[],c=Object.keys(o);for(let i=0;i<c.length;i++){const a=c[i],m=r.createElement(t,{onError:t=>e._onError(t)},r.createElement(l,{fallback:null},o[a])),u=e.getElementByKey(a);null!==u&&n.push(s(m,u,a))}return n}),[t,o,e])}(E,a);return function(e){p((()=>m(d(e),f(e))),[e])}(E),r.createElement(r.Fragment,null,t,r.createElement(g,{content:o}),x)}function g({content:r}){const[o]=e(),n=function(e){const[t,r]=c((()=>E(e)));return p((()=>{function t(){const t=E(e);r(t)}return t(),m(e.registerUpdateListener((()=>{t()})),e.registerEditableListener((()=>{t()})))}),[e]),t}(o),i=t();return n?"function"==typeof r?r(i):r:null}export{x as PlainTextPlugin};
