/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';var b=require("@lexical/link"),k=require("@lexical/react/LexicalComposerContext"),l=require("@lexical/react/LexicalNodeMenuPlugin"),q=require("@lexical/utils"),r=require("lexical"),t=require("react"),u=Object.create(null);if(t)for(var B in t)u[B]=t[B];u.default=t;let C=r.createCommand("INSERT_EMBED_COMMAND");class D extends l.MenuOption{constructor(f,n){super(f);this.title=f;this.onSelect=n.onSelect.bind(this)}}exports.AutoEmbedOption=D;exports.INSERT_EMBED_COMMAND=C;
exports.LexicalAutoEmbedPlugin=function({embedConfigs:f,onOpenEmbedModalForConfig:n,getMenuOptions:v,menuRenderFn:E,menuCommandPriority:F=r.COMMAND_PRIORITY_LOW}){let [d]=k.useLexicalComposerContext(),[g,w]=t.useState(null),[h,x]=t.useState(null),m=t.useCallback(()=>{w(null);x(null)},[]),y=t.useCallback(c=>{d.getEditorState().read(async function(){const a=r.$getNodeByKey(c);if(b.$isLinkNode(a))for(let e=0;e<f.length;e++){const p=f[e];null!=await Promise.resolve(p.parseUrl(a.__url))&&(x(p),w(a.getKey()))}})},
[d,f]);t.useEffect(()=>{let c=(a,{updateTags:e,dirtyLeaves:p})=>{for(const [z,G]of a)"created"===G&&e.has("paste")&&3>=p.size?y(z):z===g&&m()};return q.mergeRegister(...[b.LinkNode,b.AutoLinkNode].map(a=>d.registerMutationListener(a,(...e)=>c(...e))))},[y,d,f,g,m]);t.useEffect(()=>d.registerCommand(C,c=>{let a=f.find(({type:e})=>e===c);return a?(n(a),!0):!1},r.COMMAND_PRIORITY_EDITOR),[d,f,n]);let A=t.useCallback(async function(){if(null!=h&&null!=g){const c=d.getEditorState().read(()=>{const a=r.$getNodeByKey(g);
return b.$isLinkNode(a)?a:null});if(b.$isLinkNode(c)){const a=await Promise.resolve(h.parseUrl(c.__url));null!=a&&d.update(()=>{r.$getSelection()||c.selectEnd();h.insertNode(d,a);c.isAttached()&&c.remove()})}}},[h,d,g]),H=t.useMemo(()=>null!=h&&null!=g?v(h,A,m):[],[h,A,v,g,m]),I=t.useCallback((c,a,e)=>{d.update(()=>{c.onSelect(a);e()})},[d]);return null!=g?u.createElement(l.LexicalNodeMenuPlugin,{nodeKey:g,onClose:m,onSelectOption:I,options:H,menuRenderFn:E,commandPriority:F}):null};
exports.URL_MATCHER=/((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
