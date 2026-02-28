import "./BudgetGauge.css";
import MoreIcon from "../../assets/icons/more.png";
function BudgetGauge({ budgets }) {
  const total =
    budgets?.reduce((sum, b) => sum + parseFloat(b.TotalAmount || 0), 0) || 0;
  const used =
    budgets?.reduce((sum, b) => sum + parseFloat(b.UsedAmount || 0), 0) || 0;
  const pct = total > 0 ? Math.min(Math.round((used / total) * 100), 100) : 0;

  const r = 70;
  const cx = 110;
  const cy = 105;

  const toXY = (angle, radius = r) => ({
    x: cx + radius * Math.cos(angle),
    y: cy - radius * Math.sin(angle),
  });

  const describeArc = (start, end, radius = r) => {
    const s = toXY(start, radius);
    const e = toXY(end, radius);
    const largeArc = Math.abs(end - start) > Math.PI ? 1 : 0;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${largeArc} 1 ${e.x} ${e.y}`;
  };

  const usedEndAngle = Math.PI - (pct / 100) * Math.PI;

  const formatAmount = (val) => {
    const whole = Math.floor(val).toLocaleString();
    const dec = (val % 1).toFixed(2).slice(1); // ".00"
    return { whole, dec };
  };

  const totalFmt = formatAmount(total);
  const usedFmt = formatAmount(used);

  return (
    <div className="budgetGauge">
      <div className="gaugeHeader">
        <h3 className="gaugeTitle">Monthly budget</h3>
        <button className="gaugeMenu">
          {" "}
          <img src={MoreIcon} alt="More" className="icon" />
        </button>
      </div>

      <div className="gaugeTotal">
        £{totalFmt.whole}
        <span className="gaugeFaded">{totalFmt.dec}</span>
      </div>
      <div className="gaugeWrapper">
        <div className="gaugeSvgWrapper">
          <svg viewBox="0 0 220 115" className="gaugeSvg">
            <path
              d={describeArc(Math.PI, 0)}
              fill="none"
              stroke="#b7d4b3"
              strokeWidth="15"
              strokeLinecap="round"
            />
            <path
              d={describeArc(Math.PI, usedEndAngle)}
              fill="none"
              stroke="#8fbc8f"
              strokeWidth="15"
              strokeLinecap="round"
            />
          </svg>

          <div className="gaugeCenter">
            <span className="gaugePctLabel">{pct}% spent</span>
            <div className="gaugeUsed">
              £{usedFmt.whole}
              <span className="gaugeFaded">{usedFmt.dec}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetGauge;
