import "./AnalyticsCategoryChart.css";

const CATEGORY_COLORS = [
  "#8fbc8f", "#b7d4b3", "#a8d5a2", "#66bb6a",
  "#81c784", "#c8e6c9", "#aed6ae", "#6dab6d",
];

function AnalyticsCategoryChart({ categories }) {
  if (!categories || categories.length === 0)
    return <p className="analyticsEmpty">No category data yet.</p>;

  const total = categories.reduce((s, c) => s + c.value, 0);
  const cx = 60, cy = 60, r = 48;
  const circumference = 2 * Math.PI * r;
  let cumulative = 0;

  return (
    <div className="analyticsCategoryChart">
      <svg viewBox="0 0 120 120" className="analyticsDonutSvg">
        {categories.map(({ label, value }, i) => {
          const pct = value / total;
          const offset = circumference * (1 - pct);
          const rotation = (cumulative / total) * 360 - 90;
          cumulative += value;
          return (
            <circle
              key={label}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={CATEGORY_COLORS[i % CATEGORY_COLORS.length]}
              strokeWidth={16}
              strokeDasharray={`${pct * circumference} ${(1 - pct) * circumference}`}
              strokeDashoffset={0}
              transform={`rotate(${rotation} ${cx} ${cy})`}
            >
              <title>{label}: £{value.toFixed(2)}</title>
            </circle>
          );
        })}
        <text x={cx} y={cy - 6} textAnchor="middle" className="donutCentreLabel">Total</text>
        <text x={cx} y={cy + 10} textAnchor="middle" className="donutCentreValue">
          £{total.toFixed(0)}
        </text>
      </svg>

      <ul className="analyticsCategoryLegend">
        {categories.map(({ label, value }, i) => (
          <li key={label} className="analyticsCategoryItem">
            <span
              className="analyticsCategoryDot"
              style={{ background: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }}
            />
            <span className="analyticsCategoryName">{label}</span>
            <span className="analyticsCategoryValue">£{value.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnalyticsCategoryChart;