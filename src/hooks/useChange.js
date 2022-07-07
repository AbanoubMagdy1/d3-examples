import { useState } from 'react';

function useChange (val) {
  const [data, setData] = useState(val);

  function handleChange ({ target }) {
    setData(target.value);
  }

  return [data, handleChange];
}

export default useChange;