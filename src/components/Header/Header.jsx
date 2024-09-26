import React, { useState } from 'react';
import logo from '../../assets/thislogo.png';
import userPic from '../../assets/avatar_placeholder.png';
import NotificationMenu from './NotificationMenu/NotificationMenu.jsx';
import ConfigMenu from './ConfigMenu/ConfigMenu.jsx';
import { logout } from '../../services/AuthService.js';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [configVisible, setConfigVisible] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(false);
    setConfigVisible(false);
    setNotifVisible(false);
    setMenuVisible(!menuVisible);
  };

  const toggleConfig = () => {
    setMenuVisible(false);
    setNotifVisible(false);
    setConfigVisible(!configVisible);
  };

  const toggleNotif = () => {
    setMenuVisible(false);
    setConfigVisible(false);
    setNotifVisible(!notifVisible);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header_logo">
        <img src={logo} alt="LOGO" />
      </div>
      <nav className="header_nav">
        <Link className="nav-option-link" to="/dashboard">Dashboard</Link>
        <Link className="nav-option-link" to="/calendar">Calendario</Link>
        <Link className="nav-option-link" to="/board">Tablero</Link>
      </nav>
      <div className="user-menu">
        <div className="notif-button" onClick={toggleNotif}>
          <i className="fa fa-bell"></i>
        </div>
        <div className="config-button" onClick={toggleConfig}>
          <i className="fa fa-cog"></i>
        </div>
        <div className="user-button" onClick={toggleMenu}>
          <img src={userPic} alt="Usuario" className="user-pic" />
        </div>
        {menuVisible && (
          <div className="dropdown-menu">
            <ul>
              <li><a href="/profile">Mi Perfil</a></li>
              <li><a href="/login" onClick={handleLogout}>Cerrar sesión</a></li>
            </ul>
          </div>
        )}
        {configVisible && <ConfigMenu />}
        {notifVisible && <NotificationMenu />}
      </div>
      
    </header>
  );
};

export default Header;
