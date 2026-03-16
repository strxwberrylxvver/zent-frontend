import TransactionsTable from "./TransactionsTable.js";
import CalendarIcon from "../../assets/icons/calendar.png";
import SortIcon from "../../assets/icons/sorting.png";
import FilterIcon from "../../assets/icons/filter.png";
import Action from "../../UI/Actions";
import "./TransactionsTableContainer.css";

function TransactionsTableContainer({ transactions, onSelect, onClick }) {
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
              buttonText="+ Add new transaction "
              onClick={onClick}
            />
          </Action.Tray>
        </div>
      </div>
      <div className="itemsLength">
        <p>{transactions.length} items </p>
      </div>
      <div className="TransactionsTableContainer">
        <TransactionsTable transactions={transactions} onSelect={onSelect} />
      </div>
    </>
  );
}

export default TransactionsTableContainer;
