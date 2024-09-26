import React, { useState } from 'react';
import './MemberCard.css';

const MemberCard = ({ profileImage, nombre, username, isAdmin }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleOptionClick = (option) => {
    console.log(option);
    setShowMenu(false);
  };

  return (
    <div className="member-card">
      <img src={profileImage} alt={`${nombre} profile`} className="profile-image" />
      <div className="member-info">
        <h3 className="member-name">{nombre}</h3>
        <p className="member-alias">@{username}</p>
      </div>
      <div className="menu-container">
        <button className="menu-button" onClick={toggleMenu}>⋮</button>
        {showMenu && (
          <div className="menu-dropdown">
            <ul>
              <li onClick={() => handleOptionClick('Ver perfil')}>Ver perfil</li>
              <li onClick={() => handleOptionClick('Ver tareas')}>Ver tareas</li>
              {isAdmin && (
                <li onClick={() => handleOptionClick('Eliminar miembro')} className="delete-option">Eliminar miembro</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberCard;
