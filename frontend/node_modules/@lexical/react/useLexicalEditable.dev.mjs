/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLayoutEffect, useEffect, useMemo, useRef, useState } from 'react';

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

/**
 * Shortcut to Lexical subscriptions when values are used for render.
 */
function useLexicalSubscription(subscription) {
  const [editor] = useLexicalComposerContext();
  const initializedSubscription = useMemo(() => subscription(editor), [editor, subscription]);
  const valueRef = useRef(initializedSubscription.initialValueFn());
  const [value, setValue] = useState(valueRef.current);
  useLayoutEffectImpl(() => {
    const {
      initialValueFn,
      subscribe
    } = initializedSubscription;
    const currentValue = initialValueFn();
    if (valueRef.current !== currentValue) {
      valueRef.current = currentValue;
      setValue(currentValue);
    }
    return subscribe(newValue => {
      valueRef.current = newValue;
      setValue(newValue);
    });
  }, [initializedSubscription, subscription]);
  return value;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function subscription(editor) {
  return {
    initialValueFn: () => editor.isEditable(),
    subscribe: callback => {
      return editor.registerEditableListener(callback);
    }
  };
}
function useLexicalEditable() {
  return useLexicalSubscription(subscription);
}

export { useLexicalEditable as default };
