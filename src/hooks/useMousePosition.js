import { useState } from 'react';
import useEventListener from './useEventListener';

function useMousePosition () {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  function handleMouseMove ({ clientX, clientY }) {
    setMousePos({ x: clientX, y: clientY });
  }

  useEventListener(window, 'mousemove', handleMouseMove);

  return mousePos;
}

export default useMousePosition;