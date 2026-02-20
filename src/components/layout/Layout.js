import { useState } from "react";
import Header from "./Header.js";
import NavBar from "./NavBar.js";
import Footer from "./Footer.js";

import "./Layout.css";

function Layout(props) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="app-container">
      <aside className={sidebarOpen ? "sidebar open" : "sidebar closed"}>
        <Header />
        <NavBar />
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {sidebarOpen ? "<" : ">"}
        </button>
      </aside>
      <div
        className={sidebarOpen ? "main-wrapper open" : "main-wrapper closed"}
      >
        <main>{props.children}</main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
