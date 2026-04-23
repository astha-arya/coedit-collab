/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import * as React from 'react';
import { useLayoutEffect, useEffect, useState, useCallback } from 'react';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const CAN_USE_DOM = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined';

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const useLayoutEffectImpl = CAN_USE_DOM ? useLayoutEffect : useEffect;

function ContentEditable({
  ariaActiveDescendant,
  ariaAutoComplete,
  ariaControls,
  ariaDescribedBy,
  ariaExpanded,
  ariaLabel,
  ariaLabelledBy,
  ariaMultiline,
  ariaOwns,
  ariaRequired,
  autoCapitalize,
  className,
  id,
  role = 'textbox',
  spellCheck = true,
  style,
  tabIndex,
  'data-testid': testid,
  ...rest
}) {
  const [editor] = useLexicalComposerContext();
  const [isEditable, setEditable] = useState(false);
  const ref = useCallback(rootElement => {
    // defaultView is required for a root element.
    // In multi-window setups, the defaultView may not exist at certain points.
    if (rootElement && rootElement.ownerDocument && rootElement.ownerDocument.defaultView) {
      editor.setRootElement(rootElement);
    }
  }, [editor]);
  useLayoutEffectImpl(() => {
    setEditable(editor.isEditable());
    return editor.registerEditableListener(currentIsEditable => {
      setEditable(currentIsEditable);
    });
  }, [editor]);
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    "aria-activedescendant": !isEditable ? undefined : ariaActiveDescendant,
    "aria-autocomplete": !isEditable ? 'none' : ariaAutoComplete,
    "aria-controls": !isEditable ? undefined : ariaControls,
    "aria-describedby": ariaDescribedBy,
    "aria-expanded": !isEditable ? undefined : role === 'combobox' ? !!ariaExpanded : undefined,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-multiline": ariaMultiline,
    "aria-owns": !isEditable ? undefined : ariaOwns,
    "aria-readonly": !isEditable ? true : undefined,
    "aria-required": ariaRequired,
    autoCapitalize: autoCapitalize,
    className: className,
    contentEditable: isEditable,
    "data-testid": testid,
    id: id,
    ref: ref,
    role: role,
    spellCheck: spellCheck,
    style: style,
    tabIndex: tabIndex
  }));
}

export { ContentEditable };
