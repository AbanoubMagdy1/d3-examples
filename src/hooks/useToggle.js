import { useState } from 'react';

function useToggle (def) {
  const [val, setVal] = useState(typeof def === 'boolean' ? def : true);

  function toggle (passedVal) {
    setVal(typeof passedVal === 'boolean' ? passedVal : !val);
  }

  return [val, toggle];
}

export default useToggle;