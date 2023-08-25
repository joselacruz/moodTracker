import React, { useContext, useEffect, useState } from "react";
import { MoodContext } from "../../Context";
import { UserContext } from "../../Context/userContext";
import { NavLink } from "react-router-dom";
import ToogleMenu from "../TooogleMenu";
import UserDetail from "../UserDetail";
import { PiMaskHappy } from "react-icons/pi";
import { ImMenu } from "react-icons/im";
import { FaUserAlt } from "react-icons/fa";

import "./Header.css";

const Header = () => {
  const [openUserDetail, setOpenUserDetail] = useState(false);
  const contexUserIsAuth = useContext(UserContext);
  const context = useContext(MoodContext);

  // Manejador para abrir y cerrar el detalle del usuario
  const handleClickUser = () => {
    setOpenUserDetail(!openUserDetail);
  };

  // Manejador para el menú móvil
  const handleMenuMobile = () => {
    context.setMenuMobile(!context.menuMobile);
  };

  // Cerrar el menú móvil cuando se hace clic en un enlace
  const closeMenuMobile = () => {
    context.setMenuMobile(false);
  };

  // Establecer el desbordamiento del cuerpo en función del estado del menú móvil
  useEffect(() => {
    document.body.style.overflow = context.menuMobile ? "hidden" : "auto";
  }, [context.menuMobile]);

  return (
    <nav>
      <ul className="nav-list">
        {/* Ícono del menú móvil */}
        <li className="menu">
          <ImMenu color="#ffffff" size={28} onClick={handleMenuMobile} />
        </li>

        {/* Enlace al inicio */}
        <li>
          <NavLink to="/">
            <PiMaskHappy className="iconPage" />
            Mood Tracker
          </NavLink>
        </li>

        {/* Enlace al calendario */}
        <li>
          <NavLink
            to="/calendar"
            className={contexUserIsAuth.user ? "activeStyle" : ""}
          >
            Calendar
          </NavLink>
        </li>

        {/* Enlace a las tendencias */}
        <li>
          <NavLink
            to="/trends"
            className={contexUserIsAuth.user ? "activeStyle" : ""}
          >
            Trends
          </NavLink>
        </li>

        {/* Ícono del usuario autenticado */}
        {contexUserIsAuth.user && (
          <li className="user" onClick={handleClickUser}>
            <FaUserAlt />
          </li>
        )}

        {/* Detalle del usuario */}
        {contexUserIsAuth.user && openUserDetail && (
          <div className="user-detail-float">
            <UserDetail />
          </div>
        )}

        {/* Enlace para iniciar sesión (no autenticado) */}
        {!contexUserIsAuth.user && (
          <li className="login-user-not-auth">
            <NavLink
              to="/login"
              className={contexUserIsAuth.user ? "activeStyle" : ""}
            >
              Sign In
            </NavLink>
          </li>
        )}
      </ul>

      {/* Menú desplegable móvil */}
      {context.menuMobile && <ToogleMenu onClose={closeMenuMobile}>Hi</ToogleMenu>}
    </nav>
  );
};

export default Header;
