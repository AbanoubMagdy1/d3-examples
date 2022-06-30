import { useState, useEffect } from 'react';
import { asyncHandler } from '../utils';

function useFetch (request, params) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getData () {
    const [resp, error] = await asyncHandler(request, params);
    if (resp) {
      setData(resp);
    } else {
      setError(error?.response?.data?.message || error?.message
            || 'An Error occured, Please try again later.');
    }
    setLoading(false);
  }

  useEffect(function () {
    getData();
  }, []);

  return { data, loading, error };
}

export default useFetch;