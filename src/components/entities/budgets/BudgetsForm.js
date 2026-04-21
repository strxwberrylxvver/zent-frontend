import { useState } from "react";
import PropTypes from "prop-types";
import FormItem from "../../UI/Form";
import { API } from "../../api/API";
import Action from "../../UI/Actions";

const emptyBudget = {
  BudgetName: "",
  UsedAmount: 0,
  TotalAmount: 0,
  BudgetDate: "",
  UserID: "c41b8df7-8e57-4744-aa3c-215657baf916",
  CategoryID: "a3c1b5e2-7d8f-4b9c-9e1d-2f3a4b5c6d7e",
};

export default function BudgetForm({
  initialBudget = emptyBudget,
  onCancel,
  onSuccess,
  reloadBudgets,
}) {
  const isEdit = Boolean(initialBudget.BudgetID);

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  const isValid = {
    BudgetName: (name) => name.trim().length > 2,
    UsedAmount: (amount) => amount !== 0 && !isNaN(amount),
    TotalAmount: (amount) => amount !== 0 && !isNaN(amount),
    BudgetDate: (date) => Boolean(date),
  };
  const errorMessage = {
    BudgetName: "Your budget name is too short",
    UsedAmount: "Your amount is invalid",
    TotalAmount: "Your amount is invalid",
    BudgetDate: "Your date is invalid",
  };

  const [budget, setBudget] = useState({
    ...initialBudget,
    BudgetDate: formatDateForInput(initialBudget.BudgetDate),
  });
  const [errors, setErrors] = useState(
    Object.keys(initialBudget).reduce(
      (accum, key) => ({ ...accum, [key]: null }),
      {}
    )
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = name === "Amount" ? parseFloat(value) : value;
    setBudget({ ...budget, [name]: newValue });
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
      const value = budget[key];
      newErrors[key] = isValid[key](value) ? null : errorMessage[key];
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((e) => e === null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateAll()) return;
    console.log("Submitting budget:", budget);
    let result;
    if (isEdit) {
      result = await API.put(`/budgets/${budget.BudgetID}`, budget);
      reloadBudgets();
    } else {
      result = await API.post("/budgets", budget);
    }
    if (result.isSuccess) onSuccess();
    else alert(result.message);
  };

  return (
    <form className="BudgetModalPane" onSubmit={handleSubmit}>
      <div className="BudgetFormRow">
        <FormItem
          label="Budget Name"
          htmlFor="BudgetName"
          error={errors.BudgetName}
        >
          <input
            className={`FormInput${errors.BudgetName ? " hasError" : ""}`}
            type="text"
            name="BudgetName"
            placeholder="e.g. Groceries"
            value={budget.BudgetName}
            onChange={handleChange}
          />
        </FormItem>

        <FormItem
          label="Budget Date"
          htmlFor="BudgetDate"
          error={errors.BudgetDate}
        >
          <input
            className={`FormInput${errors.BudgetDate ? " hasError" : ""}`}
            type="date"
            name="BudgetDate"
            value={budget.BudgetDate}
            onChange={handleChange}
          />
        </FormItem>
        <FormItem
          label="Used Amount"
          htmlFor="UsedAmount"
          error={errors.UsedAmount}
        >
          <input
            className={`FormInput${errors.UsedAmount ? " hasError" : ""}`}
            type="number"
            step="0.01"
            name="UsedAmount"
            placeholder="$0.00"
            value={budget.UsedAmount}
            onChange={handleChange}
          />
        </FormItem>

        <FormItem
          label="Total Amount"
          htmlFor="TotalAmount"
          error={errors.TotalAmount}
        >
          <input
            className={`FormInput${errors.TotalAmount ? " hasError" : ""}`}
            type="number"
            step="0.01"
            name="TotalAmount"
            placeholder="$0.00"
            value={budget.TotalAmount}
            onChange={handleChange}
          />
        </FormItem>
      </div>
      <Action.Tray>
        <Action.Submit showText buttonText="Submit" onClick={handleSubmit} />
        <Action.Cancel showText buttonText="Cancel" onClick={onCancel} />
      </Action.Tray>
    </form>
  );
}

BudgetForm.propTypes = {
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};
