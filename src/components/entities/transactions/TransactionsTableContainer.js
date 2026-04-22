import TransactionsTable from "./TransactionsTable.js";
import CalendarIcon from "../../assets/icons/calendar.png";
import SortIcon from "../../assets/icons/sorting.png";
import FilterIcon from "../../assets/icons/filter.png";
import Action from "../../UI/Actions";
import EmptyState from "../../UI/EmptyState";
import "./TransactionsTableContainer.css";

function TransactionsTableContainer({
  transactions, onSelect, onClick, filters, onFilterChange, onReset, categories = [],
}) {
  const hasActiveFilters =
    filters.category || filters.type || filters.search ||
    filters.sort !== "date" || filters.order !== "desc";

  const isFiltered = filters.category || filters.type || filters.search;

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
            <img src={SortIcon} alt="Sort" className="icon" />
            <select className="sorterSelect" value={filters.sort}
              onChange={(e) => onFilterChange("sort", e.target.value)}>
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="name">Name</option>
              <option value="category">Category</option>
            </select>
          </label>
          <label className="iconOutline sorterLabel">
            <select className="sorterSelect" value={filters.order}
              onChange={(e) => onFilterChange("order", e.target.value)}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </label>
          <label className="iconOutline sorterLabel">
            <img src={FilterIcon} alt="Filter" className="icon" />
            <select className="sorterSelect" value={filters.category}
              onChange={(e) => onFilterChange("category", e.target.value)}>
              <option value="">All categories</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label className="iconOutline sorterLabel">
            <select className="sorterSelect" value={filters.type}
              onChange={(e) => onFilterChange("type", e.target.value)}>
              <option value="">All types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>
          {hasActiveFilters && (
            <button className="reset sorterReset" onClick={onReset}>Reset all</button>
          )}
        </div>
        <div className="addButton">
          <Action.Tray>
            <Action.Add showText buttonText="+ Add new transaction" onClick={onClick} />
          </Action.Tray>
        </div>
      </div>

      <div className="itemsLength"><p>{transactions.length} items</p></div>

      {transactions.length === 0 ? (
        isFiltered ? (
          <EmptyState icon="🔍" title="No results" message="No transactions match your current filters." />
        ) : (
          <EmptyState icon="💸" title="No transactions yet" message="Add your first transaction to start tracking your spending." />
        )
      ) : (
        <div className="TransactionsTableContainer">
          <TransactionsTable transactions={transactions} onSelect={onSelect} />
        </div>
      )}
    </>
  );
}

export default TransactionsTableContainer;