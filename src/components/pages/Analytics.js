import AnalyticsCrudler from "../entities/analytics/AnalyticsCrudler.js";
import "../../global.css";
function Analytics() {
  return (
    <section>
      <section className="budgetsPageView">
        <h1>Analytics</h1>
        <div className="caption">
          <p>A breakdown of your financial activity</p>
        </div>
        <AnalyticsCrudler />
      </section>
    </section>
  );
}

export default Analytics;
