import "./AnalyticsEmptyState.css";

function AnalyticsEmptyState() {
  return (
    <div className="analyticsEmptyState">
      <div className="analyticsEmptyIcon">🌱</div>
      <h2 className="analyticsEmptyTitle">Nothing to show yet</h2>
      <p className="analyticsEmptyText">
        Add some transactions and savings goals to start seeing your analytics.
      </p>
    </div>
  );
}

export default AnalyticsEmptyState;