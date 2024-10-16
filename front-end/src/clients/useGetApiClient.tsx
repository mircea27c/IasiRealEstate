import { useEffect, useState } from "react";

const useGetApiClient = <T,>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [fetchTries, setFetchTries] = useState(0);
  const TRY_FETCH_INTERVAL = 7000;
  const MAX_FETCH_TRIES = 10;

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api${endpoint}`)
      .then((response) => response.json())
      .then((data: T) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);

        setFetchTries(fetchTries + 1);
      });
  };

  useEffect(() => {
    if (fetchTries == 0) {
      fetchData();
    } else if (fetchTries < MAX_FETCH_TRIES) {
      const timeout = setTimeout(() => fetchData(), TRY_FETCH_INTERVAL);
      return () => clearTimeout(timeout);
    }
  }, [fetchTries]);

  return { data, loading, error };
};

export default useGetApiClient;
