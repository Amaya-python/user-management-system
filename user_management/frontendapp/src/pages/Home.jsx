import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">USER MANAGEMENT PLATFORM</span>

          <h1>
            Manage Your Users
            <br />
            <span>Smarter and Faster.</span>
          </h1>

          <p>
            A modern user management system for creating, managing,
            updating and monitoring user information efficiently.
          </p>

          <div className="hero-buttons">
            <Link to="/dashboard" className="primary-btn">
              View Dashboard →
            </Link>

            <Link to="/users" className="secondary-btn">
              Manage Users
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-icon">👥</div>
          <h3>User Management</h3>
          <p>Centralized user control and management.</p>

          <div className="hero-mini-stats">
            <div>
              <strong>+</strong>
              <span>Add Users</span>
            </div>

            <div>
              <strong>✎</strong>
              <span>Update Users</span>
            </div>

            <div>
              <strong>⌕</strong>
              <span>Manage Data</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>System Features</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3>User Management</h3>
            <p>Create, update, view and delete user records.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Dashboard</h3>
            <p>Monitor total users and important system information.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast Management</h3>
            <p>Manage user data quickly through a modern interface.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;