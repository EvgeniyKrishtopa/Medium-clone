import { useState, useEffect, useRef, useCallback } from "react";
import useLocalStorage from "./useLocalStorage";
import axios from "axios";

export default (url, { path }) => {
  const baseUrl = "https://conduit.productionready.io/api/";
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage("token");

  const prevPathRef = useRef();

  useEffect(() => {
    prevPathRef.current = path;
  }, [path]);

  const prevPath = prevPathRef.current;

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    let skipGetResponseAfterDestroy = false;
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : "",
        },
      },
    };

    if (!isLoading) {
      return;
    }

    axios(baseUrl + url, requestOptions)
      .then((res) => {
        if (!skipGetResponseAfterDestroy) {
          setIsLoading(false);
          setResponse(res.data);
        }
      })
      .catch((err) => {
        if (!skipGetResponseAfterDestroy) {
          setIsLoading(false);
          setError(err.response.data);
        }
      });

    return () => {
      skipGetResponseAfterDestroy = true;
    };
  }, [isLoading, options, url, path, token]);

  useEffect(() => {
    if (path !== prevPath) {
      setError(null);
    }
  }, [path, prevPath]);

  return [{ isLoading, response, error }, doFetch];
};
