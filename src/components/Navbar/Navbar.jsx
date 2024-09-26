import React from 'react';
import { Link } from 'react-router-dom';

import cslogo from '../../assets/react.svg'
import { logout } from '../../services/AuthService';

const Navbar = () => {

  const handleLogout = () => {
    logout();
  };


  return (
    <nav className="navbar">
      <div className='sectitle'>PRINCIPAL</div>
      <div className='ops'>
        <div className="option">
          <div className="option-icon">
            <i className="fa fa-home" aria-hidden="true"></i>
          </div>
          <Link className="option-link" to="/dashboard">Dashboard</Link>
        </div>
        <div className="option">
          <div className="option-icon">
            <i className="fa fa-tasks" aria-hidden="true"></i>
          </div>
          <Link className="option-link" to="/projects">Proyectos</Link>
        </div>
        <div className="option">
          <div className="option-icon">
            <i className="fa fa-th" aria-hidden="true"></i>
          </div>
          <Link className="option-link" to="/organizations">Organizaciones</Link>
        </div>
      </div>
      <div className='sectitle'>MIS OPCIONES</div>
      <div className='ops'>
      <div className="option">
          <div className="option-icon">
            <i className="fa fa-user-circle" aria-hidden="true"></i>
          </div>
          <Link className="option-link" to="/profile">Mi perfil</Link>
        </div>
        <div className="option">
          <div className="option-icon">
            <i className="fa fa-list-alt" aria-hidden="true"></i>
          </div>
          <a className="option-link">Mi Historial</a>
        </div>
        <div className="option">
          <div className="option-icon">
            <i className="fa fa-cog" aria-hidden="true"></i>
          </div>
          <a className="option-link">Configuracion</a>
        </div>
      </div>
      <div className="credit">
        This. Tracker <br />   
        Version 0.1.0
      </div>
    </nav>
  );
};

export default Navbar;
