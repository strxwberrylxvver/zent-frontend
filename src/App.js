import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import DashBoard from "./components/pages/DashBoard";
import SignIn from "./components/pages/SignIn";
import PageNotFound from "./components/pages/PageNotFound";
import ContactUs from "./components/pages/ContactUs";
import "./global.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
