import "./EmptyState.css";

function EmptyState({ 
  icon = "🌱", 
  title = "Nothing to show yet", 
  message = "Add some data to get started." 
}) {
  return (
    <div className="emptyState">
      <div className="emptyStateIcon">{icon}</div>
      <h2 className="emptyStateTitle">{title}</h2>
      <p className="emptyStateText">{message}</p>
    </div>
  );
}

export default EmptyState;