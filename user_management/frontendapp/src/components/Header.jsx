import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const pageTitles = {
    "/": "Home",
    "/dashboard": "Dashboard",
    "/users": "User Management",
  };

  const title = pageTitles[location.pathname] || "UserMS";

  return (
    <header className="header">
      <div>
        <h2>{title}</h2>
        <p>Welcome to your User Management System</p>
      </div>

      <div className="header-actions">
        {/* <button className="header-icon-btn">
          <i className="bi bi-bell"></i>
        </button> */}

        <div className="header-profile">
          <div className="profile-avatar">
            A
          </div>

          <div className="profile-info">
            <strong>Administrator</strong>
            <span>Admin Panel</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;