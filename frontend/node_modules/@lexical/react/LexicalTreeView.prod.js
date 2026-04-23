/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';var c=require("@lexical/devtools-core"),d=require("@lexical/utils"),e=require("react"),g=Object.create(null);if(e)for(var l in e)g[l]=e[l];g.default=e;
exports.TreeView=function({treeTypeButtonClassName:m,timeTravelButtonClassName:n,timeTravelPanelSliderClassName:p,timeTravelPanelButtonClassName:q,viewClassName:r,timeTravelPanelClassName:t,editor:a}){let f=g.createRef(),[u,h]=e.useState(a.getEditorState()),v=c.useLexicalCommandsLog(a);e.useEffect(()=>d.mergeRegister(a.registerUpdateListener(({editorState:b})=>{h(b)}),a.registerEditableListener(()=>{h(a.getEditorState())})),[a]);e.useEffect(()=>{let b=f.current;if(null!==b)return b.__lexicalEditor=
a,()=>{b.__lexicalEditor=null}},[a,f]);return g.createElement(c.TreeView,{treeTypeButtonClassName:m,timeTravelButtonClassName:n,timeTravelPanelSliderClassName:p,timeTravelPanelButtonClassName:q,viewClassName:r,timeTravelPanelClassName:t,setEditorReadOnly:b=>{const k=a.getRootElement();null!=k&&(k.contentEditable=b?"false":"true")},editorState:u,setEditorState:b=>a.setEditorState(b),generateContent:async function(b){return c.generateContent(a,v,b)},ref:f})}
