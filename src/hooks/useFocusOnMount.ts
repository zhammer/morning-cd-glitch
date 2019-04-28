import { useState } from 'react';

type FocusProps = {
  autoFocus: boolean;
  onBlur: () => void;
  onFocus: () => void;
};

/**
 * Hook that provides props to focus an element on mount.
 *
 * ```
 * const focusProps = useFocusOnMount();
 * return <input {...focusProps} />
 * ```
 */
export default function useFocusOnMount(): FocusProps {
  const [focused, setFocused] = useState(true);
  function onBlur() {
    setFocused(false);
  }
  function onFocus() {
    setFocused(true);
  }
  return {
    autoFocus: focused,
    onBlur,
    onFocus
  };
}
