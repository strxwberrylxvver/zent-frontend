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
  CategoryID: null,
};

export default function GoalForm({
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
    BudgetName: "Your goal name is too short",
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
    <form className="BorderedForm">
      <FormItem
        label="Budget Name"
        htmlFor="BudgetName"
        advice="Please enter the name of the budget"
        error={errors.BudgetName}
      >
        <input
          type="text"
          name="BudgetName"
          placeholder="Groceries..."
          value={budget.BudgetName}
          onChange={handleChange}
        />
      </FormItem>
      <br></br>

      <FormItem
        label="Amount used"
        htmlFor="UsedAmount"
        advice="Please enter the used amount"
        error={errors.UsedAmount}
      >
        <input
          type="number"
          step="0.01"
          name="UsedAmount"
          placeholder="PPlease enter the used amount"
          value={budget.UsedAmount}
          onChange={handleChange}
        />
      </FormItem>

      <br></br>
      <FormItem
        label="Total amount"
        htmlFor="TotalAmount"
        advice="Please enter the total amount of the budget"
        error={errors.TotalAmount}
      >
        <input
          type="number"
          step="0.01"
          name="TotalAmount"
          placeholder="Please enter the total amount of the budget"
          value={budget.TotalAmount}
          onChange={handleChange}
        />
      </FormItem>
      <br></br>

      <FormItem
        label="Budget date"
        htmlFor="BudgetDate"
        advice="Please enter the budget date of the budget"
        error={errors.BudgetDate}
      >
        <input
          type="date"
          name="BudgetDate"
          placeholder="Please enter the budget date of the budget"
          value={budget.BudgetDate}
          onChange={handleChange}
        />
      </FormItem>
      <br></br>

      <Action.Tray>
        <Action.Submit showText buttonText="Submit" onClick={handleSubmit} />
        <Action.Cancel showText buttonText="Cancel" onClick={onCancel} />
      </Action.Tray>
    </form>
  );
}

GoalForm.propTypes = {
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};
