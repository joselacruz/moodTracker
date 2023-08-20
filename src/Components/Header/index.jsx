import { NavLink } from "react-router-dom";
import'./Header.css';
const Header = () => {


    return (
        <nav>
        <ul className="nav-list">
          <li>
            <NavLink
              to="/calendar"
              className={({ isActive }) => (isActive ? ' activeStyle' : "")}
            >
              Calendar
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/trends"
              className={({ isActive }) => (isActive ? 'activeStyle' : "")}
            >
              Trends
            </NavLink>
          </li>
        </ul>
      </nav>
    );
}

export default Header;