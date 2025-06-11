import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <NavLink to="/" className="nav-logo">
            Studio Ghibli
          </NavLink>
        </div>
        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Accueil
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Favoris
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
