import { useEffect, useState } from "react";
import { API } from "../api/API";

function DashBoard() {
  // Initialisation-----------------------
  const loggedinUserID = "c41b8df7-8e57-4744-aa3c-215657baf916";
  const endpoint = `/transactions/users/${loggedinUserID}`;

  // State--------------------------------
  const [transactions, setTransactions] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading records...");

  // Context------------------------------
  // Methods------------------------------
  const apiCall = async (endpoint) => {
    const response = await API.get(endpoint);
    response.isSuccess
      ? setTransactions(response.result)
      : setLoadingMessage(response.message);
  };

  useEffect(() => {
    apiCall(endpoint);
  }, [endpoint]);

  // View---------------------------------

  return (
    <section>
      <h1> Spending History</h1>;
      {!transactions ? (
        <p>{loadingMessage}</p>
      ) : transactions.length === 0 ? (
        <p>No transactions.</p>
      ) : (
        transactions.map((transaction) => (
          <p key={transaction.TransactionID}>
            {transaction.Name} {transaction.Amount} {transaction.Category}
          </p>
        ))
      )}
    </section>
  );
}
export default DashBoard;
