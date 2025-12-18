import { useState } from "react";
import PropTypes from "prop-types";
import FormItem from "../../UI/Form";
import { API } from "../../api/API";
import Action from "../../UI/Actions";

const emptyTransaction = {
  Name: "",
  Date: "",
  Amount: 0,
  Category: "",
  PaymentMethod: "",
  UserID: "c41b8df7-8e57-4744-aa3c-215657baf916",
};

export default function TransactionForm({
  initialTransaction = emptyTransaction,
  onCancel,
  onSuccess,reloadTransactions
}) {
  const isEdit = Boolean(initialTransaction.TransactionID);

  const isValid = {
    Name: (name) => name.trim().length > 3,
    Date: (date) => Boolean(date),
    Amount: (amount) => amount !== 0 && !isNaN(amount),
    Category: (cat) => Boolean(cat),
    PaymentMethod: (method) => Boolean(method),
  };
  const errorMessage = {
    Name: "Your transaction name is too short",
    Date: "Your date is invalid",
    Amount: "Your amount is invalid",
    Category: "Please choose a category",
    PaymentMethod: "Please select a payment method ",
  };

  const [transaction, setTransaction] = useState(initialTransaction);
  const [errors, setErrors] = useState(
    Object.keys(initialTransaction).reduce(
      (accum, key) => ({ ...accum, [key]: null }),
      {}
    )
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = name === "Amount" ? parseFloat(value) : value;
    setTransaction({ ...transaction, [name]: newValue });
    setErrors({
      ...errors,
      [name]: isValid[name]
        ? isValid[name](newValue)
          ? null
          : errorMessage[name]
        : null,
    });
  };

  const validateAll = () => {
    const newErrors = {};

    for (const key in isValid) {
      const value = transaction[key];
      newErrors[key] = isValid[key](value) ? null : errorMessage[key];
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((e) => e === null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateAll()) return;
    let result;
    if (isEdit) {
      result = await API.put(
        `/transactions/${transaction.TransactionID}`,
        transaction
      );
      reloadTransactions();
    
    } else {
      result = await API.post("/transactions", transaction);
    }
    if (result.isSuccess) onSuccess();
    else alert(result.message);
  };

  return (
    <form className="BorderedForm">
      <FormItem
        label="Transaction Name"
        htmlFor="Name"
        advice="Please enter the name of the transaction"
        error={errors.Name}
      >
        <input
          type="text"
          name="Name"
          placeholder="Netflix..."
          value={transaction.Name}
          onChange={handleChange}
        />
      </FormItem>
      <br></br>

      <FormItem
        label="Date"
        htmlFor="Date"
        advice="Please enter the date of the transaction"
        error={errors.Date}
      >
        <input
          type="date"
          name="Date"
          placeholder="Please enter the date of the transaction"
          value={transaction.Date}
          onChange={handleChange}
        />
      </FormItem>
      <br></br>

      <FormItem
        label="Amount"
        htmlFor="Amount"
        advice="Please enter the amount of the transaction"
        error={errors.Amount}
      >
        <input
          type="number"
          step="0.01"
          name="Amount"
          placeholder="Please enter the amount of the transaction"
          value={transaction.Amount}
          onChange={handleChange}
        />
      </FormItem>
      <br></br>

      <FormItem
        label="Category"
        htmlFor="Category"
        advice="Please select the category of the transaction"
        error={errors.Category}
      >
        <select
          name="Category"
          value={transaction.Category}
          onChange={handleChange}
        >
          <option value="">-- Choose a category --</option>
          {[
            "Entertainment",
            "Groceries",
            "Transport",
            "Bills",
            "Income",
            "Rent",
            "Other",
          ].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </FormItem>
      <br></br>

      <FormItem
        label="Payment Method"
        htmlFor="PaymentMethod"
        advice="Please pick the payment method  of the transaction"
        error={errors.PaymentMethod}
      >
        <select
          name="PaymentMethod"
          value={transaction.PaymentMethod}
          onChange={handleChange}
        >
          <option value="">-- Choose a payment method --</option>
          {["Credit Card", "Debit Card", "Cash", "Bank Transfer"].map(
            (method) => (
              <option key={method} value={method}>
                {method}
              </option>
            )
          )}
        </select>
      </FormItem>

      <br></br>
      <Action.Tray>
        <Action.Submit showText buttonText="Submit" onClick={handleSubmit} />
        <Action.Cancel showText buttonText="Cancel" onClick={onCancel} />
      </Action.Tray>
    </form>
  );
}

TransactionForm.propTypes = {
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};
