import { useState } from "react";
import "./SharedBills.css";

const MOCK_BILLS = [
  { id: 1, name: "Monthly Rent",     amount: 2300, split: 4, category: "Rent",          dueDate: "2026-05-01", paid: ["you", "alice"] },
  { id: 2, name: "Internet",         amount: 60,   split: 4, category: "Utilities",     dueDate: "2026-05-05", paid: ["you", "alice", "bob"] },
  { id: 3, name: "Electricity",      amount: 120,  split: 4, category: "Utilities",     dueDate: "2026-05-10", paid: ["alice"] },
  { id: 4, name: "Groceries (Week)", amount: 280,  split: 4, category: "Groceries",     dueDate: "2026-05-07", paid: ["you"] },
  { id: 5, name: "Council Tax",      amount: 180,  split: 4, category: "Bills",         dueDate: "2026-05-15", paid: ["you", "alice", "bob", "carol"] },
  { id: 6, name: "Netflix",          amount: 18,   split: 4, category: "Entertainment", dueDate: "2026-05-12", paid: [] },
];

const MEMBERS = ["you", "alice", "bob", "carol"];

const CATEGORY_COLORS = {
  Rent: "#8fbc8f", Utilities: "#b7d4b3", Groceries: "#66bb6a",
  Bills: "#a8d5a2", Entertainment: "#c8e6c9",
};

function BillRow({ bill }) {
  const perPerson = (bill.amount / bill.split).toFixed(2);
  const allPaid = bill.paid.length === bill.split;

  return (
    <div className={`sbBillRow${allPaid ? " sbBillRow--paid" : ""}`}>
      <div className="sbBillLeft">
        <div className="sbBillDot" style={{ background: CATEGORY_COLORS[bill.category] || "#b7b5b5" }} />
        <div>
          <p className="sbBillName">{bill.name}</p>
          <p className="sbBillCategory">{bill.category} · Due {new Date(bill.dueDate).toLocaleDateString("en-GB", { day:"2-digit", month:"short" })}</p>
        </div>
      </div>
      <div className="sbBillRight">
        <span className="sbBillAmount">£{bill.amount.toFixed(2)}</span>
        <span className="sbBillSplit">£{perPerson} each</span>
      </div>
    </div>
  );
}

function HouseholdChecklist({ bills }) {
  const [selectedBill, setSelectedBill] = useState(bills[0]?.id ?? null);
  const bill = bills.find((b) => b.id === selectedBill);

  return (
    <div className="sbCard">
      <div className="sbCardHeader">
        <h2>Household Checklist</h2>
        <select
          className="sbSelect"
          value={selectedBill ?? ""}
          onChange={(e) => setSelectedBill(Number(e.target.value))}
        >
          {bills.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
      </div>
      {bill && (
        <div className="sbChecklist">
          {MEMBERS.map((m) => {
            const paid = bill.paid.includes(m);
            return (
              <div key={m} className="sbCheckItem">
                <span className="sbMemberName">{m === "you" ? "You" : m.charAt(0).toUpperCase() + m.slice(1)}</span>
                <span className={`sbPayStatus${paid ? " sbPayStatus--paid" : " sbPayStatus--missing"}`}>
                  {paid ? "Paid" : "Missing"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function UpcomingBills({ bills }) {
  const upcoming = [...bills]
    .filter((b) => b.paid.length < b.split)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div className="sbCard">
      <div className="sbCardHeader">
        <h2>Upcoming bills next month</h2>
        <span className="sbCount">{upcoming.length} items</span>
      </div>
      <div className="sbUpcomingList">
        {upcoming.map((b) => (
          <div key={b.id} className="sbUpcomingItem">
            <div className="sbBillDot" style={{ background: CATEGORY_COLORS[b.category] || "#b7b5b5" }} />
            <div className="sbUpcomingInfo">
              <p className="sbBillName">{b.name}</p>
              <p className="sbBillCategory">{b.category}</p>
            </div>
            <span className="sbSplitBadge">£{(b.amount / b.split).toFixed(2)} each</span>
          </div>
        ))}
        {upcoming.length === 0 && <p className="sbEmpty">All bills settled! 🎉</p>}
      </div>
    </div>
  );
}

function SharedBills() {
  const totalOwed = MOCK_BILLS.reduce((s, b) => {
    if (!b.paid.includes("you")) return s + b.amount / b.split;
    return s;
  }, 0);

  return (
    <section className="sharedBillsPage">
      <div className="sbPageHeader">
        <h1>Shared Bills</h1>
        <p className="sbSub">View and track your bills</p>
      </div>

      <div className="sbSummaryRow">
        <div className="sbSummaryCard">
          <span className="sbSummaryLabel">You still owe</span>
          <span className="sbSummaryValue">£{totalOwed.toFixed(2)}</span>
        </div>
        <div className="sbSummaryCard">
          <span className="sbSummaryLabel">Household members</span>
          <span className="sbSummaryValue">{MEMBERS.length}</span>
        </div>
        <div className="sbSummaryCard">
          <span className="sbSummaryLabel">Active bills</span>
          <span className="sbSummaryValue">{MOCK_BILLS.length}</span>
        </div>
      </div>

      <div className="sbCard">
        <div className="sbCardHeader">
          <h2>Bills Summary</h2>
          <span className="sbCount">{MOCK_BILLS.length} bills</span>
        </div>
        <div className="sbBillsList">
          {MOCK_BILLS.map((b) => <BillRow key={b.id} bill={b} />)}
        </div>
      </div>

      <div className="sbBottomGrid">
        <HouseholdChecklist bills={MOCK_BILLS} />
        <UpcomingBills bills={MOCK_BILLS} />
      </div>
    </section>
  );
}

export default SharedBills;