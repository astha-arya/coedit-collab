/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import{useLexicalCommandsLog as e,TreeView as t,generateContent as a}from"@lexical/devtools-core";import{mergeRegister as r}from"@lexical/utils";import*as l from"react";import{useState as i,useEffect as s}from"react";function n({treeTypeButtonClassName:n,timeTravelButtonClassName:o,timeTravelPanelSliderClassName:m,timeTravelPanelButtonClassName:c,viewClassName:d,timeTravelPanelClassName:u,editor:C}){const N=l.createRef(),[v,E]=i(C.getEditorState()),T=e(C);s((()=>r(C.registerUpdateListener((({editorState:e})=>{E(e)})),C.registerEditableListener((()=>{E(C.getEditorState())})))),[C]),s((()=>{const e=N.current;if(null!==e)return e.__lexicalEditor=C,()=>{e.__lexicalEditor=null}}),[C,N]);return l.createElement(t,{treeTypeButtonClassName:n,timeTravelButtonClassName:o,timeTravelPanelSliderClassName:m,timeTravelPanelButtonClassName:c,viewClassName:d,timeTravelPanelClassName:u,setEditorReadOnly:e=>{const t=C.getRootElement();null!=t&&(t.contentEditable=e?"false":"true")},editorState:v,setEditorState:e=>C.setEditorState(e),generateContent:async function(e){return a(C,T,e)},ref:N})}export{n as TreeView};
