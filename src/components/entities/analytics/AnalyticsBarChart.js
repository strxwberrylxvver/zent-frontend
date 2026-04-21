import "./AnalyticsBarChart.css";

function AnalyticsBarChart({ data, color = "#8fbc8f" }) {
  if (!data || data.length === 0)
    return <p className="analyticsEmpty">No spending data yet.</p>;

  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="analyticsBarChart">
      {data.map(({ label, value }) => {
        const pct = (value / max) * 100;
        return (
          <div key={label} className="analyticsBarGroup">
            <div className="analyticsBarTrack">
              <div
                className="analyticsBarFill"
                style={{ height: `${pct}%`, background: color }}
                title={`£${value.toFixed(2)}`}
              />
            </div>
            <span className="analyticsBarLabel">{label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default AnalyticsBarChart;