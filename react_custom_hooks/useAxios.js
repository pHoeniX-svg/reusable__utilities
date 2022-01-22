import axios from 'axios';
import { useEffect, useState } from 'react';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

const useAxios = (axiosParams, ref, initialState) => {
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(initialState);
  // const isComponentMounted = useRef(true);

  const fetchData = async (params, source) => {
    setIsLoading(true);

    try {
      const response = await axios.request(params, {
        cancelToken: source.token,
      });
      setResult(response.data);
      setIsError(null);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('ERROR_RESPONSE_D', error.response.data);
        console.log('ERROR_RESPONSE_S', error.response.status);
        console.log('ERROR_RESPONSE_H', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('ERROR_REQUEST', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('ERROR', error.message);
      }
      console.log('ERROR_CONFIG', error.config);
      console.log('ERROR_JSON', error.toJSON());
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    if (ref.current) fetchData(axiosParams, source);

    return () => {
      source.cancel();
      ref.current = false;
    };
  }, [params]);

  return { result, isError, isLoading };
};

export default useAxios;
