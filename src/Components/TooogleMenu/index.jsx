import { Portal } from "../Portal";
import { NavLink } from "react-router-dom";
import UserDetail from "../UserDetail";
import { CgClose } from "react-icons/cg";
import "./ToogleMenu.css";

const ToogleMenu = ({ onClose }) => {
  return (
    <Portal containerClass="ToogleMenu">
      <CgClose className="close-toogleMenu" onClick={onClose} />
      <ul onClick={onClose}>
        <li>
          <NavLink to="/calendar">Calendar</NavLink>
        </li>
        <li>
          <NavLink to="/trends">Trends</NavLink>
        </li>
      </ul>
      <UserDetail />
    </Portal>
  );
};
export default ToogleMenu;