import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetch = (url) => {
  let fetchDataState = {
    data: [],
    isLoading: false,
    error: false,
  };
  const [fetchedData, setSetFetchedData] = useState(fetchDataState);

  const cancelTokenSource = axios.CancelToken.source();

  const fetchData = useCallback(async () => {
    setSetFetchedData({ isLoading: true });
    try {
      const response = await axios.get(url, {
        CancelToken: cancelTokenSource.token,
      });
      const data = await response.data;
      if (data) {
        setSetFetchedData({
          data: data.result ? data.result : data,
          isLoading: false,
          error: false,
        });
      }
    } catch (error) {
      if (axios.Cancel(error)) {
        console.log("fetching data is canceled");
      } else {
        console.log("error occurred");
      }

      setSetFetchedData({
        data: [],
        isLoading: false,
        error: true,
      });
    }
  }, [url]);

  useEffect(() => {
    fetchData();
    return () => cancelTokenSource.cancel;
  }, [url, fetchData]);

  const { data, isLoading, error } = fetchedData;
  return { data, isLoading, error };
};

export default useFetch;
