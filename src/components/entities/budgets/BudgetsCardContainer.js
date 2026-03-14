import BudgetsCard from "./BudgetsCard";
import CalendarIcon from "../../assets/icons/calendar.png";
import SortIcon from "../../assets/icons/sorting.png";
import FilterIcon from "../../assets/icons/filter.png";
import Action from "../../UI/Actions";
import "./BudgetsCardContainer.css";

function BudgetsCardContainer({ budgets, onSelect, onClick }) {
  return (
    <>
      <div className="topBar">
        <div className="sorters">
          <div className="iconOutline">
            <img src={CalendarIcon} alt="Calendar" className="icon" />
          </div>
          <div className="iconOutline">
            <p>This month</p>
          </div>
          <div className="iconOutline">
            <img src={SortIcon} alt="Sort" className="icon" />
          </div>
          <div className="iconOutline">
            <p>Sort by: Default </p>
          </div>
          <div className="iconOutline">
            <img src={FilterIcon} alt="Filter" className="icon" />
          </div>
          <div className="reset">
            <p>Reset all </p>
          </div>
        </div>
        <div className="addButton">
          <Action.Tray>
            <Action.Add
              showText
              buttonText="+ Add new budget "
              onClick={onClick}
            />
          </Action.Tray>
        </div>
      </div>
      <div className="budgetsCardContainer">
        {budgets.map((budget) => (
          <BudgetsCard
            key={budget.BudgetID}
            budget={budget}
            onClick={() => onSelect(budget)}
          />
        ))}
      </div>
    </>
  );
}

export default BudgetsCardContainer;
