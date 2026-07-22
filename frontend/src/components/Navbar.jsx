import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container-lg">
        <Link className="navbar-brand" to="/">
          EMS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={expanded}
          aria-label="Toggle navigation"
          onClick={() => setExpanded(!expanded)}
        >
          <FiMenu size={24} color="#fff" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                to="/dashboard"
                className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}>
                📊 Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/departments") ? "active" : ""}`}
                to="/departments"
              >
                Departments
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/employees") ? "active" : ""}`}
                to="/employees"
              >
                Employees
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={logout}
                style={{
                  color: "#e74c3c",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <FiLogOut size={18} />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
