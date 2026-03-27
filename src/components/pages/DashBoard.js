import { useAuth } from "../auth/useAuth";
import StudentDashboard from "./StudentDashBoard";
import AdvisorDashboard from "./AdvisorDashBoard";
import ParentDashboard from "./ParentDashBoard";
import "./DashBoard.css";

function DashBoard() {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.userType) {
      case "Student":           return <StudentDashboard />;
      case "Financial Advisor": return <AdvisorDashboard />;
      case "Parent/Carer":      return <ParentDashboard />;
      default:                  return <p>Unknown user type.</p>;
    }
  };

  return (
    <section className="dashboard">
      <h1>Welcome back, {user?.firstName}</h1>
      {renderDashboard()}
    </section>
  );
}

export default DashBoard;