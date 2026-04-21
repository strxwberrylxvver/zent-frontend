import { useEffect, useState, useCallback } from "react";
import { API } from "./API";

export default function useLoad(endpoint) {
  const [data, setData] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading records...");

  const load = useCallback(async (ep) => {
    setData(null);
    const response = await API.get(ep);
    response.isSuccess
      ? setData(response.result)
      : setLoadingMessage(response.message);
  }, []);

  useEffect(() => {
    if (endpoint) load(endpoint);
  }, [endpoint, load]);

  return [data, setData, loadingMessage, load];
}