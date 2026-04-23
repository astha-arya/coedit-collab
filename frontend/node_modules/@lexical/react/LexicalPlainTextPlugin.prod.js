/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';var b=require("@lexical/react/LexicalComposerContext"),f=require("@lexical/react/useLexicalEditable"),h=require("react"),m=require("@lexical/text"),n=require("@lexical/utils"),p=require("react-dom"),q=require("@lexical/dragon"),r=require("@lexical/plain-text"),v=Object.create(null);if(h)for(var w in h)v[w]=h[w];v.default=h;let x="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement?h.useLayoutEffect:h.useEffect;
function y(a){return a.getEditorState().read(m.$canShowPlaceholderCurry(a.isComposing()))}function z(a){let [d,c]=h.useState(()=>y(a));x(()=>{function e(){let g=y(a);c(g)}e();return n.mergeRegister(a.registerUpdateListener(()=>{e()}),a.registerEditableListener(()=>{e()}))},[a]);return d}
function A(a,d){let [c,e]=h.useState(()=>a.getDecorators());x(()=>a.registerDecoratorListener(g=>{p.flushSync(()=>{e(g)})}),[a]);h.useEffect(()=>{e(a.getDecorators())},[a]);return h.useMemo(()=>{let g=[],t=Object.keys(c);for(let k=0;k<t.length;k++){let l=t[k],C=v.createElement(d,{onError:B=>a._onError(B)},v.createElement(h.Suspense,{fallback:null},c[l])),u=a.getElementByKey(l);null!==u&&g.push(p.createPortal(C,u,l))}return g},[d,c,a])}
function D(a){x(()=>n.mergeRegister(r.registerPlainText(a),q.registerDragonSupport(a)),[a])}function E({content:a}){var [d]=b.useLexicalComposerContext();d=z(d);let c=f();return d?"function"===typeof a?a(c):a:null}exports.PlainTextPlugin=function({contentEditable:a,placeholder:d,ErrorBoundary:c}){let [e]=b.useLexicalComposerContext();c=A(e,c);D(e);return v.createElement(v.Fragment,null,a,v.createElement(E,{content:d}),c)}
