import PropTypes from "prop-types";

export default function Action({ children, onClick, showText, buttonText }) {
  return (
    <button className="Action" onClick={onClick}>
      {children} {showText && <p>{buttonText}</p>}
    </button>
  );
}

Action.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  showText: PropTypes.bool,
  buttonText: PropTypes.string.isRequired,
};

export function Tray({ children }) {
  return <div className="ActionTray">{children}</div>;
}
Tray.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const ActionPropTypes = {
  onClick: PropTypes.func.isRequired,
  showText: PropTypes.bool,
  buttonText: PropTypes.string,
};

Add.propTypes = ActionPropTypes;

export function Add({ onClick, showText = false, buttonText = "Add" }) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

Cancel.propTypes = ActionPropTypes;

export function Cancel({ onClick, showText = false, buttonText = "Cancel" }) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

Submit.propTypes = ActionPropTypes;

export function Submit({ onClick, showText = false, buttonText = "Submit" }) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

Delete.propTypes = ActionPropTypes;

export function Delete({ onClick, showText = false, buttonText = "Delete" }) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

Edit.propTypes = ActionPropTypes;

export function Edit({ onClick, showText = false, buttonText = "Modify" }) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

Action.Tray = Tray;
Action.Add = Add;
Action.Cancel = Cancel;
Action.Submit = Submit;
Action.Delete = Delete;
Action.Edit = Edit;
