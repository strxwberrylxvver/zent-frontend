import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import DashBoard from "./components/pages/DashBoard";
import Transactions from "./components/pages/Transactions";
import Budgets from "./components/pages/Budgets";
import Goals from "./components/pages/Goals";
import Analytics from "./components/pages/Analytics";
import SharedBills from "./components/pages/SharedBills";
import SignIn from "./components/pages/SignIn";
import PageNotFound from "./components/pages/PageNotFound";
import ContactUs from "./components/pages/ContactUs";
import SignUp from "./components/pages/SignUp";
import { AuthProvider } from "./components/auth/useAuth";
import ProtectedRoute from "./components/auth/protectedRoutes";
import "./global.css";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path="/budgets" element={<ProtectedRoute><Budgets /></ProtectedRoute>} />
          <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/sharedbills" element={<ProtectedRoute><SharedBills /></ProtectedRoute>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
