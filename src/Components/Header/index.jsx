import { useContext, useEffect, useState } from "react";
import { MoodContext } from "../../Context";
import { NavLink } from "react-router-dom";
import ToogleMenu from "../TooogleMenu";
import UserDetail from "../UserDetail";
import { PiMaskHappy } from "react-icons/pi";
import { ImMenu } from "react-icons/im";
import { FaUserAlt } from "react-icons/fa";
import "./Header.css";



const Header = () => {
  const [openUserDetail, setOpenUserDetail] = useState(false);
  const context =  useContext(MoodContext);

  const handleClick = () => {
    setOpenUserDetail(!openUserDetail);
  };

  const handleMenuMobile = () => {
    context.setMenuMobile(!context.menuMobile);
  };

  const closeMenuMobile = () => {
    context.setMenuMobile(false);
  };

  useEffect(() => {
    if (context.menuMobile) {
      document.body.style.overflow = "hidden"; // Desactivar scroll
    } else {
      document.body.style.overflow = "auto"; // Restablecer scroll
    }
  }, [context.menuMobile]);
  return (
    <nav>
      <ul className="nav-list">
        <li className="menu">
          {" "}
          <ImMenu color="#ffffff" size={28} onClick={handleMenuMobile} />
        </li>
        <li>
          <NavLink to="/">
            <PiMaskHappy className="iconPage" />
            Mood Tracker
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/calendar"
            className={({ isActive }) => (isActive ? " activeStyle" : "")}
          >
            Calendar
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/trends"
            className={({ isActive }) => (isActive ? "activeStyle" : "")}
          >
            Trends
          </NavLink>
        </li>
        <li className="user" onClick={handleClick}>
          <FaUserAlt />
        </li>
        {openUserDetail && (
          <div className="user-detail-float">
            <UserDetail />
          </div>
        )}
      </ul>

      {context.menuMobile && <ToogleMenu onClose={closeMenuMobile}>Hi</ToogleMenu>}
    </nav>
  );
};

export default Header;
