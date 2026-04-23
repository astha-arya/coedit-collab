/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import useLexicalEditable from '@lexical/react/useLexicalEditable';
import * as React from 'react';
import { useLayoutEffect, useEffect, useState, useMemo, Suspense } from 'react';
import { $canShowPlaceholderCurry } from '@lexical/text';
import { mergeRegister } from '@lexical/utils';
import { flushSync, createPortal } from 'react-dom';
import { registerDragonSupport } from '@lexical/dragon';
import { registerPlainText } from '@lexical/plain-text';

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

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function canShowPlaceholderFromCurrentEditorState(editor) {
  const currentCanShowPlaceholder = editor.getEditorState().read($canShowPlaceholderCurry(editor.isComposing()));
  return currentCanShowPlaceholder;
}
function useCanShowPlaceholder(editor) {
  const [canShowPlaceholder, setCanShowPlaceholder] = useState(() => canShowPlaceholderFromCurrentEditorState(editor));
  useLayoutEffectImpl(() => {
    function resetCanShowPlaceholder() {
      const currentCanShowPlaceholder = canShowPlaceholderFromCurrentEditorState(editor);
      setCanShowPlaceholder(currentCanShowPlaceholder);
    }
    resetCanShowPlaceholder();
    return mergeRegister(editor.registerUpdateListener(() => {
      resetCanShowPlaceholder();
    }), editor.registerEditableListener(() => {
      resetCanShowPlaceholder();
    }));
  }, [editor]);
  return canShowPlaceholder;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function useDecorators(editor, ErrorBoundary) {
  const [decorators, setDecorators] = useState(() => editor.getDecorators());

  // Subscribe to changes
  useLayoutEffectImpl(() => {
    return editor.registerDecoratorListener(nextDecorators => {
      flushSync(() => {
        setDecorators(nextDecorators);
      });
    });
  }, [editor]);
  useEffect(() => {
    // If the content editable mounts before the subscription is added, then
    // nothing will be rendered on initial pass. We can get around that by
    // ensuring that we set the value.
    setDecorators(editor.getDecorators());
  }, [editor]);

  // Return decorators defined as React Portals
  return useMemo(() => {
    const decoratedPortals = [];
    const decoratorKeys = Object.keys(decorators);
    for (let i = 0; i < decoratorKeys.length; i++) {
      const nodeKey = decoratorKeys[i];
      const reactDecorator = /*#__PURE__*/React.createElement(ErrorBoundary, {
        onError: e => editor._onError(e)
      }, /*#__PURE__*/React.createElement(Suspense, {
        fallback: null
      }, decorators[nodeKey]));
      const element = editor.getElementByKey(nodeKey);
      if (element !== null) {
        decoratedPortals.push( /*#__PURE__*/createPortal(reactDecorator, element, nodeKey));
      }
    }
    return decoratedPortals;
  }, [ErrorBoundary, decorators, editor]);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function usePlainTextSetup(editor) {
  useLayoutEffectImpl(() => {
    return mergeRegister(registerPlainText(editor), registerDragonSupport(editor));

    // We only do this for init
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function PlainTextPlugin({
  contentEditable,
  placeholder,
  ErrorBoundary
}) {
  const [editor] = useLexicalComposerContext();
  const decorators = useDecorators(editor, ErrorBoundary);
  usePlainTextSetup(editor);
  return /*#__PURE__*/React.createElement(React.Fragment, null, contentEditable, /*#__PURE__*/React.createElement(Placeholder, {
    content: placeholder
  }), decorators);
}
function Placeholder({
  content
}) {
  const [editor] = useLexicalComposerContext();
  const showPlaceholder = useCanShowPlaceholder(editor);
  const editable = useLexicalEditable();
  if (!showPlaceholder) {
    return null;
  }
  if (typeof content === 'function') {
    return content(editable);
  } else {
    return content;
  }
}

export { PlainTextPlugin };
