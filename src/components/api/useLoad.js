import { useEffect, useState } from "react";
import { API } from "./API";

export default function useLoad(endpoint) {
  const [transactions, setTransactions] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading records...");

  const loadTransactions = async (endpoint) => {
    const response = await API.get(endpoint);
    response.isSuccess
      ? setTransactions(response.result)
      : setLoadingMessage(response.message);
  };

  useEffect(() => { loadTransactions(endpoint) }, [endpoint]);

  return [transactions, setTransactions, loadingMessage, loadTransactions];
}