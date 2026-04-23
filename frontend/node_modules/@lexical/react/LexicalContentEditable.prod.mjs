/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import{useLexicalComposerContext as e}from"@lexical/react/LexicalComposerContext";import*as a from"react";import{useLayoutEffect as t,useEffect as i,useState as r,useCallback as o}from"react";function n(){return n=Object.assign?Object.assign.bind():function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},n.apply(this,arguments)}const d="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement?t:i;function l({ariaActiveDescendant:t,ariaAutoComplete:i,ariaControls:l,ariaDescribedBy:c,ariaExpanded:s,ariaLabel:b,ariaLabelledBy:m,ariaMultiline:u,ariaOwns:p,ariaRequired:v,autoCapitalize:f,className:w,id:x,role:y="textbox",spellCheck:C=!0,style:E,tabIndex:h,"data-testid":O,...g}){const[D]=e(),[L,j]=r(!1),k=o((e=>{e&&e.ownerDocument&&e.ownerDocument.defaultView&&D.setRootElement(e)}),[D]);return d((()=>(j(D.isEditable()),D.registerEditableListener((e=>{j(e)})))),[D]),a.createElement("div",n({},g,{"aria-activedescendant":L?t:void 0,"aria-autocomplete":L?i:"none","aria-controls":L?l:void 0,"aria-describedby":c,"aria-expanded":L&&"combobox"===y?!!s:void 0,"aria-label":b,"aria-labelledby":m,"aria-multiline":u,"aria-owns":L?p:void 0,"aria-readonly":!L||void 0,"aria-required":v,autoCapitalize:f,className:w,contentEditable:L,"data-testid":O,id:x,ref:k,role:y,spellCheck:C,style:E,tabIndex:h}))}export{l as ContentEditable};
