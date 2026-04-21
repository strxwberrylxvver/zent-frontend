import { useState } from "react";
import PropTypes from "prop-types";
import FormItem from "../../UI/Form";
import { API } from "../../api/API";
import { useAuth } from "../../auth/useAuth";
import Action from "../../UI/Actions";

const CATEGORIES = ["Entertainment", "Groceries", "Transport", "Bills", "Income", "Rent", "Subscriptions", "Other"];
const PAYMENT_METHODS = ["Credit Card", "Debit Card", "Cash", "Bank Transfer"];

const emptyTransaction = {
  Name: "",
  Date: "",
  Amount: "",
  Category: "",
  PaymentMethod: "",
};

export default function TransactionForm({
  initialTransaction = emptyTransaction,
  onCancel,
  onSuccess,
  reloadTransactions,
}) {
  const { user } = useAuth();
  const isEdit = Boolean(initialTransaction.TransactionID);

  // For editing, derive the type from the stored amount sign
  const initialType = initialTransaction.Amount < 0 ? "expense" : "income";
  const [type, setType] = useState(isEdit ? initialType : "expense");

  const [transaction, setTransaction] = useState({
    ...initialTransaction,
    // Show the absolute value in the input
    Amount: initialTransaction.Amount ? Math.abs(parseFloat(initialTransaction.Amount)) : "",
  });

  const [errors, setErrors] = useState({});

  const isValid = {
    Name:          (v) => v.trim().length > 2,
    Date:          (v) => Boolean(v),
    Amount:        (v) => v !== "" && !isNaN(v) && parseFloat(v) > 0,
    Category:      (v) => Boolean(v),
    PaymentMethod: (v) => Boolean(v),
  };

  const errorMessages = {
    Name:          "Name must be at least 3 characters.",
    Date:          "Please enter a valid date.",
    Amount:        "Please enter a positive amount.",
    Category:      "Please choose a category.",
    PaymentMethod: "Please select a payment method.",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsed = name === "Amount" ? value : value;
    setTransaction((prev) => ({ ...prev, [name]: parsed }));
    if (isValid[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: isValid[name](parsed) ? null : errorMessages[name],
      }));
    }
  };

  const validateAll = () => {
    const newErrors = {};
    for (const key in isValid) {
      newErrors[key] = isValid[key](transaction[key]) ? null : errorMessages[key];
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    // Apply sign based on type toggle
    const signedAmount = type === "expense"
      ? -Math.abs(parseFloat(transaction.Amount))
      :  Math.abs(parseFloat(transaction.Amount));

    const payload = {
      ...transaction,
      Amount: signedAmount,
      UserID: user?.userID,
    };

    const result = isEdit
      ? await API.put(`/transactions/${transaction.TransactionID}`, payload)
      : await API.post("/transactions", payload);

    if (result.isSuccess) {
      if (isEdit && reloadTransactions) reloadTransactions();
      onSuccess();
    } else {
      alert(result.message);
    }
  };

  return (
    <form className="BorderedForm" onSubmit={handleSubmit}>

      {/* Income / Expense toggle */}
      <div className="typeToggle">
        <button
          type="button"
          className={`typeBtn${type === "expense" ? " typeBtn--active typeBtn--expense" : ""}`}
          onClick={() => setType("expense")}
        >
          − Expense
        </button>
        <button
          type="button"
          className={`typeBtn${type === "income" ? " typeBtn--active typeBtn--income" : ""}`}
          onClick={() => setType("income")}
        >
          + Income
        </button>
      </div>

      <FormItem label="Transaction Name" htmlFor="Name" error={errors.Name}>
        <input
          type="text" name="Name" placeholder="Netflix..."
          value={transaction.Name} onChange={handleChange}
        />
      </FormItem>

      <FormItem label="Date" htmlFor="Date" error={errors.Date}>
        <input
          type="date" name="Date"
          value={transaction.Date} onChange={handleChange}
        />
      </FormItem>

      <FormItem label="Amount (£)" htmlFor="Amount" error={errors.Amount}>
        <input
          type="number" step="0.01" min="0" name="Amount"
          placeholder="0.00"
          value={transaction.Amount} onChange={handleChange}
        />
      </FormItem>

      <FormItem label="Category" htmlFor="Category" error={errors.Category}>
        <select name="Category" value={transaction.Category} onChange={handleChange}>
          <option value="">-- Choose a category --</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </FormItem>

      <FormItem label="Payment Method" htmlFor="PaymentMethod" error={errors.PaymentMethod}>
        <select name="PaymentMethod" value={transaction.PaymentMethod} onChange={handleChange}>
          <option value="">-- Choose a payment method --</option>
          {PAYMENT_METHODS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </FormItem>

      <Action.Tray>
        <Action.Submit showText buttonText="Submit" onClick={handleSubmit} />
        <Action.Cancel showText buttonText="Cancel" onClick={onCancel} />
      </Action.Tray>
    </form>
  );
}

TransactionForm.propTypes = {
  onCancel:           PropTypes.func,
  onSuccess:          PropTypes.func,
  reloadTransactions: PropTypes.func,
};