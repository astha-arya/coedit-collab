/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';var b=require("@lexical/react/LexicalCollaborationContext"),h=require("@lexical/react/LexicalComposerContext"),n=require("react"),p=Object.create(null);if(n)for(var t in n)p[t]=n[t];p.default=n;var u;
function v(a){let k=new URLSearchParams;k.append("code",a);for(let e=1;e<arguments.length;e++)k.append("v",arguments[e]);throw Error(`Minified Lexical error #${a}; visit https://lexical.dev/docs/error?${k} for the full message or `+"use the non-minified dev environment for full errors and additional helpful warnings.");}u=v&&v.__esModule&&Object.prototype.hasOwnProperty.call(v,"default")?v["default"]:v;function x(a){a=a.transform();return null!==a?new Set([a]):new Set}
exports.LexicalNestedComposer=function({initialEditor:a,children:k,initialNodes:e,initialTheme:y,skipCollabChecks:z}){let w=n.useRef(!1),q=n.useContext(h.LexicalComposerContext);null==q&&u(9);let [f,{getTheme:A}]=q,C=n.useMemo(()=>{var d=y||A()||void 0;const B=h.createLexicalComposerContext(q,d);void 0!==d&&(a._config.theme=d);a._parentEditor=f;if(e)for(var c of e){var g=d=null;"function"!==typeof c&&(g=c,c=g.replace,d=g.with,g=g.withKlass||null);const m=a._nodes.get(c.getType());a._nodes.set(c.getType(),
{exportDOM:m?m.exportDOM:void 0,klass:c,replace:d,replaceWithKlass:g,transforms:x(c)})}else{c=a._nodes=new Map(f._nodes);for(const [m,l]of c)a._nodes.set(m,{exportDOM:l.exportDOM,klass:l.klass,replace:l.replace,replaceWithKlass:l.replaceWithKlass,transforms:x(l.klass)})}a._config.namespace=f._config.namespace;a._editable=f._editable;return[a,B]},[]),{isCollabActive:D,yjsDocMap:E}=b.useCollaborationContext(),r=z||w.current||E.has(a.getKey());n.useEffect(()=>{r&&(w.current=!0)},[r]);n.useEffect(()=>
f.registerEditableListener(d=>{a.setEditable(d)}),[a,f]);return p.createElement(h.LexicalComposerContext.Provider,{value:C},!D||r?k:null)}
