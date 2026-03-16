"use client";

/**
 * Hook to detect Caps Lock state for password fields. Improves UX by warning users.
 */

import { useState, useCallback } from "react";

/**
 * Returns whether Caps Lock is currently on, and a keydown handler to attach to password inputs.
 * The handler updates state based on the key and getModifierState('CapsLock').
 *
 * @returns { capsLockOn, onKeyDown } for use in password input wrapper.
 */
export function useCapsLock() {
  const [capsLockOn, setCapsLockOn] = useState(false);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.getModifierState) {
      setCapsLockOn(e.getModifierState("CapsLock"));
    }
  }, []);

  return { capsLockOn, onKeyDown };
}
