import { useEffect, useState } from "react";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users/")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  const totalUsers = users.length;

  const averageAge =
    users.length > 0
      ? (
          users.reduce((total, user) => total + Number(user.age), 0) /
          users.length
        ).toFixed(1)
      : 0;

  const latestUsers = [...users].slice(-5).reverse();

  return (
    <div className="dashboard-page">
      <div className="page-title">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your user management system.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>

          <div>
            <p>Total Users</p>
            <h2>{loading ? "..." : totalUsers}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎂</div>

          <div>
            <p>Average Age</p>
            <h2>{loading ? "..." : averageAge}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📋</div>

          <div>
            <p>Latest Records</p>
            <h2>{loading ? "..." : latestUsers.length}</h2>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-users-card">
          <div className="card-header">
            <div>
              <h2>Recent Users</h2>
              <p>Recently added user records</p>
            </div>
          </div>

          {loading ? (
            <p className="loading-text">Loading users...</p>
          ) : latestUsers.length === 0 ? (
            <p className="empty-text">No users found.</p>
          ) : (
            <div className="recent-users-list">
              {latestUsers.map((user) => (
                <div className="recent-user" key={user.id}>
                  <div className="user-avatar">
                    {user.first_name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="user-info">
                    <h4>
                      {user.first_name} {user.last_name}
                    </h4>
                    <p>{user.email}</p>
                  </div>

                  <span className="age-badge">{user.age} yrs</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;