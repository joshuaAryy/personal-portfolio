import { NavLink } from "react-router-dom";

export default function ProfileNav() {
  return (
    <nav className="profile-nav" aria-label="Profile sections">
      <NavLink end className={({ isActive }) => (isActive ? "active" : "")} to="/profile">
        Overview
      </NavLink>
      <NavLink end className={({ isActive }) => (isActive ? "active" : "")} to="/profile/journey">
        Journey
      </NavLink>
      <span aria-disabled="true" title="Awaiting owner photos">
        Personal Highlights
      </span>
      <NavLink end className={({ isActive }) => (isActive ? "active" : "")} to="/profile/demos">
        Demos
      </NavLink>
    </nav>
  );
}
