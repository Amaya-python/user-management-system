import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>UserMS</h2>
        <span>Management Portal</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span>⌂</span>
          Home
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span>▦</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span>♙</span>
          User Management
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <p>User Management System</p>
        <small>Admin Dashboard</small>
      </div>
    </aside>
  );
}

export default Sidebar;