import TransactionsCrudler from "../entities/transactions/TransactionsCrudler";

function DashBoard() {
  const loggedinUserID = "c41b8df7-8e57-4744-aa3c-215657baf916";
  const endpoint = `/transactions/users/${loggedinUserID}`;
  return (
    <section>
      <h1>Welcome, Merrone</h1>
      <TransactionsCrudler endpoint={endpoint} />
    </section>
  );
}
export default DashBoard;
