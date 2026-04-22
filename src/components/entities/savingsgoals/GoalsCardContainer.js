import GoalsCard from "./GoalsCard";
import CalendarIcon from "../../assets/icons/calendar.png";
import SortIcon from "../../assets/icons/sorting.png";
import FilterIcon from "../../assets/icons/filter.png";
import Action from "../../UI/Actions";
import "./GoalsCardContainer.css";

function GoalsCardContainer({ goals, onSelect, onAdd, filters, onFilterChange, onReset }) {
  const hasActiveFilters =
    filters.search ||
    filters.sort !== "date" ||
    filters.order !== "desc";

  return (
    <>
      <div className="topBar">
        <div className="sorters">

          <label className="iconOutline sorterLabel">
            <img src={CalendarIcon} alt="Calendar" className="icon" />
            <input
              type="month"
              className="sorterInput"
              value={filters.month}
              onChange={(e) => onFilterChange("month", e.target.value)}
            />
          </label>

          <label className="iconOutline sorterLabel">
            <img src={SortIcon} alt="Sort" className="icon" />
            <select
              className="sorterSelect"
              value={filters.sort}
              onChange={(e) => onFilterChange("sort", e.target.value)}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="name">Name</option>
            </select>
          </label>

          <label className="iconOutline sorterLabel">
            <select
              className="sorterSelect"
              value={filters.order}
              onChange={(e) => onFilterChange("order", e.target.value)}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </label>

          {hasActiveFilters && (
            <button className="reset sorterReset" onClick={onReset}>
              Reset all
            </button>
          )}
        </div>

        <div className="addButton">
          <Action.Tray>
            <Action.Add showText buttonText="+ Add new goal" onClick={onAdd} />
          </Action.Tray>
        </div>
      </div>

      <div className="itemsLength">
        <p>{goals.length} items</p>
      </div>

      {goals.length === 0 ? (
        <p className="noResults">No goals match your filters.</p>
      ) : (
        <div className="goalsCardContainer">
          {goals.map((goal) => (
            <GoalsCard key={goal.GoalID} goal={goal} onClick={() => onSelect(goal)} />
          ))}
        </div>
      )}
    </>
  );
}

export default GoalsCardContainer;