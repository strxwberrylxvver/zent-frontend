import Header from "./Header.js";
import NavBar from "./NavBar.js";
import Footer from "./Footer.js";
import "./Layout.css";

function Layout(props) {
  // Properties---------------------------
  // Hooks--------------------------------
  // Context------------------------------
  // Methods------------------------------
  // View---------------------------------

  return (
    <div className="centrepane">
      <Header />
      <NavBar />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
