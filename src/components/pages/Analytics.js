import AnalyticsCrudler from "../entities/analytics/AnalyticsCrudler.js";
import "../../global.css";

function Analytics() {
  return (
    <section>
      <h1>Analytics</h1>
      <div className="caption">
        <p>A breakdown of your financial activity</p>
      </div>
      <AnalyticsCrudler />
    </section>
  );
}

export default Analytics;