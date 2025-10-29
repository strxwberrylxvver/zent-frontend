import { useEffect, useState } from "react";
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
    const URL = "http://localhost:5001/api";
    const endpointAddress = URL + endpoint;
    const response = await fetch(endpointAddress);
    const result = await response.json();
    setTransactions(result);
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
