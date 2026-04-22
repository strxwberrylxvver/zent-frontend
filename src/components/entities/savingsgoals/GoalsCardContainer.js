import { useState } from "react";
import GoalsCard from "./GoalsCard";
import CalendarIcon from "../../assets/icons/calendar.png";
import SortIcon from "../../assets/icons/sorting.png";
import FilterIcon from "../../assets/icons/filter.png";
import Action from "../../UI/Actions";
import EmptyState from "../../UI/EmptyState";
import "./GoalsCardContainer.css";

function GoalsCardContainer({ goals, onSelect, onAdd, filters, onFilterChange, onReset }) {
  const [searchInput, setSearchInput] = useState(filters.search || "");

  const hasActiveFilters = filters.search || filters.sort !== "date" || filters.order !== "desc";
  const isFiltered = Boolean(filters.search);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    onFilterChange("search", e.target.value, true);
  };

  const handleReset = () => {
    setSearchInput("");
    onReset();
  };

  const complete = goals.filter(
    (g) => parseFloat(g.SavedAmount) >= parseFloat(g.TargetAmount)
  ).length;
  const inProgress = goals.length - complete;

  return (
    <>
      <div className="topBar">
        <div className="sorters">
          <label className="iconOutline sorterLabel">
            <img src={CalendarIcon} alt="Calendar" className="icon" />
            All Time
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
            <img src={SortIcon} alt="Order" className="icon" />
            <select className="sorterSelect" value={filters.order}
              onChange={(e) => onFilterChange("order", e.target.value)}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </label>
          <label className="iconOutline sorterLabel">
            <input type="text" className="sorterInput" placeholder="Search..."
              value={searchInput} onChange={handleSearchChange} />
          </label>
          {hasActiveFilters && (
            <button className="reset sorterReset" onClick={handleReset}>Reset all</button>
          )}
        </div>
        <div className="addButton">
          <Action.Tray>
            <Action.Add showText buttonText="+ Add new goal" onClick={onAdd} />
          </Action.Tray>
        </div>
      </div>

      <div className="goalsSummary">
        <div className="goalsSummaryItem">
          <span className="goalsSummaryCount">{goals.length}</span>
          <span className="goalsSummaryLabel">Total</span>
        </div>
        <div className="goalsSummaryDivider" />
        <div className="goalsSummaryItem">
          <span className="goalsSummaryCount inProgress">{inProgress}</span>
          <span className="goalsSummaryLabel">In progress</span>
        </div>
        <div className="goalsSummaryDivider" />
        <div className="goalsSummaryItem">
          <span className="goalsSummaryCount complete">{complete}</span>
          <span className="goalsSummaryLabel">Complete</span>
        </div>
      </div>

      <div className="itemsLength"><p>{goals.length} items</p></div>

      {goals.length === 0 ? (
        isFiltered ? (
          <EmptyState icon="🔍" title="No results" message="No goals match your current filters." />
        ) : (
          <EmptyState icon="🎯" title="No savings goals yet" message="Create a goal to start tracking your progress towards something." />
        )
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