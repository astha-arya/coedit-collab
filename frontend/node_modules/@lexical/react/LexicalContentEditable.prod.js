/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';var a=require("@lexical/react/LexicalComposerContext"),k=require("react"),l=Object.create(null);if(k)for(var m in k)l[m]=k[m];l.default=k;function q(){q=Object.assign?Object.assign.bind():function(h){for(var e=1;e<arguments.length;e++){var f=arguments[e],c;for(c in f)Object.prototype.hasOwnProperty.call(f,c)&&(h[c]=f[c])}return h};return q.apply(this,arguments)}
let r="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement?k.useLayoutEffect:k.useEffect;
exports.ContentEditable=function({ariaActiveDescendant:h,ariaAutoComplete:e,ariaControls:f,ariaDescribedBy:c,ariaExpanded:t,ariaLabel:u,ariaLabelledBy:v,ariaMultiline:w,ariaOwns:x,ariaRequired:y,autoCapitalize:z,className:A,id:B,role:n="textbox",spellCheck:C=!0,style:D,tabIndex:E,"data-testid":F,...G}){let [g]=a.useLexicalComposerContext(),[b,p]=k.useState(!1),H=k.useCallback(d=>{d&&d.ownerDocument&&d.ownerDocument.defaultView&&g.setRootElement(d)},[g]);r(()=>{p(g.isEditable());return g.registerEditableListener(d=>
{p(d)})},[g]);return l.createElement("div",q({},G,{"aria-activedescendant":b?h:void 0,"aria-autocomplete":b?e:"none","aria-controls":b?f:void 0,"aria-describedby":c,"aria-expanded":b?"combobox"===n?!!t:void 0:void 0,"aria-label":u,"aria-labelledby":v,"aria-multiline":w,"aria-owns":b?x:void 0,"aria-readonly":b?void 0:!0,"aria-required":y,autoCapitalize:z,className:A,contentEditable:b,"data-testid":F,id:B,ref:H,role:n,spellCheck:C,style:D,tabIndex:E}))}
