import React, { useEffect } from "react";
import userPic from '../../assets/avatar_placeholder.png';
import { useNavigate } from "react-router-dom";
import { getUserInfo } from '../../services/AuthService.js';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const storedUser = getUserInfo();
    
    const name = storedUser.nombre  
    const lastname = storedUser.apellido
    const email = storedUser.email
    const projectsCount = storedUser.projectsCount || 0;
    const tasksCompleted = storedUser.tasksCompleted || 0;
    const hoursLogged = storedUser.hoursLogged || 0;

    useEffect(() => {
        document.title = 'Mi Perfil - Campus Survey';
    }, []);

    const handleCalendarButton = () => {
        navigate('/calendar');
    };

    const handleProjectsButton = () => {
        navigate('/projects');
    };

    return (
        <section className="main" id="profile">
            <div className="profile-container">
                <h1 className="profile-title">Mi Perfil</h1>
                <div className="profile-card">
                    <div className="profile-header">
                        <img
                            src={userPic}
                            alt="Avatar del usuario"
                            className="profile-avatar"
                        />
                        <div className="profile-info">
                            <div className="fullname">
                                <h2 className="name">{name || "Usuario"}</h2>
                                <h2 className="lastname">{lastname || "Ejemplo"}</h2>
                            </div>
                            <p className="profile-email">{email || "usuario@ejemplo.com"}</p>
                        </div>
                    </div>
                    <div className="profile-stats">
                        <div className="stat">
                            <i className="fa fa-suitcase"></i>
                            <div className="info-col">
                                <span className="stat-title">Proyectos</span>
                                <span className="stat-value">{projectsCount}</span>
                            </div>
                        </div>
                        <div className="stat">
                        <i className="fa fa-file-text-o"></i>
                            <div className="info-col">
                                <span className="stat-title">Tareas Completadas</span>
                                <span className="stat-value">{tasksCompleted}</span>
                            </div>
                        </div>
                        <div className="stat">
                            <i className="fa fa-clock-o"></i>
                            <div className="info-col">
                                <span className="stat-title">Horas Registradas</span>
                                <span className="stat-value">{hoursLogged}</span>
                            </div>
                        </div>
                    </div>
                    <button className="calendar-button" onClick={handleCalendarButton}>
                        <i className="fa fa-calendar"></i>
                        Ver mi Calendario
                    </button>
                    <button className="projects-button" onClick={handleProjectsButton}>
                        <i className="fa fa-file-text-o"></i>
                        Ver mis Proyectos
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Profile;
