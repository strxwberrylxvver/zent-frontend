import { useEffect, useState } from "react";
import { API } from "./API";

export default function useLoad(endpoint) {
  const [data, setData] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading records...");

  const load = async (endpoint) => {
    const response = await API.get(endpoint);
    response.isSuccess
      ? setData(response.result)
      : setLoadingMessage(response.message);
  };

  useEffect(() => {
    load(endpoint);
  }, [endpoint]);

  return [data, setData, loadingMessage, load];
}