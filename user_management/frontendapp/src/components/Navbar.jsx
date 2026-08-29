import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        UserMS
      </Link>

      <div className="navbar-nav">
        <Link
          className={`nav-link ${
            location.pathname === "/" ? "active" : ""
          }`}
          to="/"
        >
          Dashboard
        </Link>

        <Link
          className={`nav-link ${
            location.pathname === "/users" ? "active" : ""
          }`}
          to="/users"
        >
          Users
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;