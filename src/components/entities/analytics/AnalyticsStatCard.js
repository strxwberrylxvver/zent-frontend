import "./AnalyticsStatCard.css";

function AnalyticsStatCard({ label, value, sub, accent = "#8fbc8f" }) {
  return (
    <div className="analyticsStatCard" style={{ "--accent": accent }}>
      <span className="analyticsStatLabel">{label}</span>
      <span className="analyticsStatValue">{value}</span>
      {sub && <span className="analyticsStatSub">{sub}</span>}
    </div>
  );
}

export default AnalyticsStatCard;