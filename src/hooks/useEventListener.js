import { useEffect } from 'react';

function useEventListener (element, type, func) {
  useEffect(() => {
    element.addEventListener(type, func);

    return () => element.removeEventListener(type, func);
  }, []);
}

export default useEventListener;