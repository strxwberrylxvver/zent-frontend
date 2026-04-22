import BudgetsCard from "./BudgetsCard";
import CalendarIcon from "../../assets/icons/calendar.png";
import SortIcon from "../../assets/icons/sorting.png";
import FilterIcon from "../../assets/icons/filter.png";
import Action from "../../UI/Actions";
import EmptyState from "../../UI/EmptyState";
import "./BudgetsCardContainer.css";

function BudgetsCardContainer({ budgets, onSelect, onClick, filters, onFilterChange, onReset }) {
  const hasActiveFilters = filters.search || filters.sort !== "date" || filters.order !== "desc";
  const isFiltered = Boolean(filters.search);

  return (
    <>
      <div className="topBar">
        <div className="sorters">
          <label className="iconOutline sorterLabel">
            <img src={CalendarIcon} alt="Calendar" className="icon" />
            <input type="month" className="sorterInput" value={filters.month}
              onChange={(e) => onFilterChange("month", e.target.value)} />
          </label>
          <label className="iconOutline sorterLabel">
            <img src={FilterIcon} alt="Sort" className="icon" />
            <select className="sorterSelect" value={filters.sort}
              onChange={(e) => onFilterChange("sort", e.target.value)}>
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="name">Name</option>
            </select>
          </label>
          <label className="iconOutline sorterLabel">
            <img src={SortIcon} alt="Sort" className="icon" />
            <select className="sorterSelect" value={filters.order}
              onChange={(e) => onFilterChange("order", e.target.value)}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </label>
          {hasActiveFilters && (
            <button className="reset sorterReset" onClick={onReset}>Reset all</button>
          )}
        </div>
        <div className="addButton">
          <Action.Tray>
            <Action.Add showText buttonText="+ Add new budget" onClick={onClick} />
          </Action.Tray>
        </div>
      </div>

      <div className="itemsLength"><p>{budgets.length} items</p></div>

      {budgets.length === 0 ? (
        isFiltered ? (
          <EmptyState icon="🔍" title="No results" message="No budgets match your current filters." />
        ) : (
          <EmptyState icon="📊" title="No budgets yet" message="Set up a budget to keep your spending on track." />
        )
      ) : (
        <div className="budgetsCardContainer">
          {budgets.map((budget) => (
            <BudgetsCard key={budget.BudgetID} budget={budget} onClick={() => onSelect(budget)} />
          ))}
        </div>
      )}
    </>
  );
}

export default BudgetsCardContainer;