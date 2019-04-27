import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * Hook for checking if a user's text input is 'confident' -- meaning their text input
 * has not changed for msUntilConfident. Useful for throttling requests to autocomplete
 * and realtime search results.
 *
 * Empty string is always considered 'confident'. Assumes that the user has deleted their
 * current input and doesn't expect more results for previous input text to show.
 *
 * Provides a forceConfident function that force sets the current input to be confident.
 * e.g. a user clicks enter immediately after typing a search query.
 *
 * @param input Text input from a user.
 * @param msUntilConfident Milliseconds for which input must remain unchanged to be considered confident.
 */
export default function useConfidentInput(
  input: string,
  msUntilConfident: number
): [string, () => void] {
  const [confidentInput, setConfidentInput] = useState(input);
  const latestInput = useRef(input);

  // Effect run every time input is changed (or msUntilConfident is changed).
  useEffect(() => {
    latestInput.current = input;

    if (input === '') {
      setConfidentInput('');
    }

    const timeout = setTimeout(() => {
      if (input === latestInput.current) {
        setConfidentInput(input);
      }
    }, msUntilConfident);

    return () => clearTimeout(timeout);
  }, [input, msUntilConfident]);

  const handleConfidentForceSet = useCallback(() => {
    setConfidentInput(input);
  }, [input]);

  return [confidentInput, handleConfidentForceSet];
}
