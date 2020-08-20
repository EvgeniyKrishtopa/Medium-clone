import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default (url, { path }) => {
  const baseUrl = "https://conduit.productionready.io/api/";
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const prevPathRef = useRef();

  useEffect(() => {
    prevPathRef.current = path;
  }, [path]);

  const prevPath = prevPathRef.current;

  const doFetch = (options = {}) => {
    setOptions(options);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    axios(baseUrl + url, options)
      .then((res) => {
        setIsLoading(false);
        setResponse(res.data);
      })
      .catch((err) => {
        setIsLoading(false);

        setError(err.response.data);
      });
  }, [isLoading, options, url, path]);

  useEffect(() => {
    if (path !== prevPath) {
      setError(null);
    }
  }, [path, prevPath]);

  return [{ isLoading, response, error }, doFetch];
};
