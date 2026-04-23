/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';var a=require("@lexical/react/LexicalComposerContext"),d=require("@lexical/react/useLexicalNodeSelection"),g=require("@lexical/utils"),h=require("lexical"),l=require("react"),m=Object.create(null);if(l)for(var q in l)m[q]=l[q];m.default=l;let r=h.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");
function t({nodeKey:b}){let [e]=a.useLexicalComposerContext(),[f,n,p]=d.useLexicalNodeSelection(b),k=l.useCallback(c=>f&&h.$isNodeSelection(h.$getSelection())&&(c.preventDefault(),c=h.$getNodeByKey(b),u(c))?(c.remove(),!0):!1,[f,b]);l.useEffect(()=>g.mergeRegister(e.registerCommand(h.CLICK_COMMAND,c=>{let x=e.getElementByKey(b);return c.target===x?(c.shiftKey||p(),n(!f),!0):!1},h.COMMAND_PRIORITY_LOW),e.registerCommand(h.KEY_DELETE_COMMAND,k,h.COMMAND_PRIORITY_LOW),e.registerCommand(h.KEY_BACKSPACE_COMMAND,
k,h.COMMAND_PRIORITY_LOW)),[p,e,f,b,k,n]);l.useEffect(()=>{let c=e.getElementByKey(b);null!==c&&(c.className=f?"selected":"")},[e,f,b]);return null}
class v extends h.DecoratorNode{static getType(){return"horizontalrule"}static clone(b){return new v(b.__key)}static importJSON(){return w()}static importDOM(){return{hr:()=>({conversion:y,priority:0})}}exportJSON(){return{type:"horizontalrule",version:1}}exportDOM(){return{element:document.createElement("hr")}}createDOM(){return document.createElement("hr")}getTextContent(){return"\n"}isInline(){return!1}updateDOM(){return!1}decorate(){return m.createElement(t,{nodeKey:this.__key})}}
function y(){return{node:w()}}function w(){return h.$applyNodeReplacement(new v)}function u(b){return b instanceof v}exports.$createHorizontalRuleNode=w;exports.$isHorizontalRuleNode=u;exports.HorizontalRuleNode=v;exports.INSERT_HORIZONTAL_RULE_COMMAND=r
