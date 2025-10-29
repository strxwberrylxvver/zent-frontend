import "./NavBar.css";

function NavBar() {
  // Properties---------------------------
  // Hooks--------------------------------
  // Context------------------------------
  // Methods------------------------------
  // View---------------------------------

  return (
    <nav>
      <div className="navItem">
        <a href="/">Home</a>
      </div>
      <div className="navItem">
        <a href="/signin">Sign In</a>
      </div>
      <div className="navItem">
        <a href="/contact">Contact Us</a>
      </div>
    </nav>
  );
}

export default NavBar;
