import { useState } from "react";
import Header from "./Header.js";
import NavBar from "./NavBar.js";
import Footer from "./Footer.js";
import TopBar from "./TopBar.js";
import { useAuth } from "../auth/useAuth";
import "./Layout.css";

function Layout(props) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="app-container">
      {user && (
        <aside className={sidebarOpen ? "sidebar open" : "sidebar closed"}>
          <Header />
          <NavBar />
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {sidebarOpen ? "<" : ">"}
          </button>
        </aside>
      )}
      <div className={user
        ? sidebarOpen ? "main-wrapper open" : "main-wrapper closed"
        : "main-wrapper full"
      }>
        <main>
          {user && <TopBar />}
          {props.children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
