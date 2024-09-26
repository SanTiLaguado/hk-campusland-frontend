import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, Folder } from 'lucide-react';
import ProjectProgress from '../../components/ProjectProgress/ProyectProgress.jsx';
import NotificationList from '../../components/NotificationList/NotificationList.jsx';
import './Dashboard.css';
import { getUserInfo } from '../../services/AuthService.js';

const Dashboard = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState();
    const [hoursWorked, setHoursWorked] = useState(20);
    const [recentActivities, setRecentActivities] = useState([]);
    const [organizations, setOrganizations] = useState([
        { name: 'Org A', alias: 'org-a' },
        { name: 'Org B', alias: 'org-b' },
        { name: 'Org C', alias: 'org-c' },
    ]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const storedUser = getUserInfo();

        if (storedUser) {
            setUserName(storedUser.nombre);
        } else {
            console.error("No se encontró información del usuario.");
        }
    
        const activities = [
            "Actividad 1: Completar tarea A",
            "Actividad 2: Reunión con el equipo",
            "Actividad 3: Revisar el informe del proyecto",
            "Actividad 4: Enviar correos a clientes",
        ];
        setRecentActivities(activities);
    
        const notificationsData = [
            "Notificación 1: Tienes una nueva tarea asignada",
            "Notificación 2: Reunión programada para mañana a las 10 AM",
            "Notificación 3: El proyecto X ha sido actualizado",
            "Notificación 4: Tienes un nuevo mensaje en el chat",
        ];
        setNotifications(notificationsData);
    }, []);

    const handleManageClick = (alias) => {
        navigate(`/${alias}`);
    };

    const hancleTasksClick = () => {
        navigate(`/board`);
    };

    const hancleProyectsClick = () => {
        navigate(`/proyects`);
    };

    const handleActivityClick = (activity) => {
        console.log(`Clicked activity: ${activity}`);
    };

    const handleNotificationClick = (notification) => {
        console.log(`Clicked notification: ${notification}`);
    };

    return (
        <section className="main" id="dashboard">
            <div className="header-dashboard">
                <h1>Hola, {userName}!</h1>
                <p>Mis Horas Trabajadas: <span>{hoursWorked}</span></p>
            </div>

            <div className="dashboard-sections">
                <div className='col-a'>
                    <div className="summary">
                        <h2>Tu Resumen</h2>
                        <div className='content'>
                            <div className='summ' onClick={hancleTasksClick}>
                                <div className='title'>
                                    <p>Tareas Pendientes</p>
                                    <CheckSquare className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className='content'>
                                    <div className="text">5</div>
                                </div>
                            </div>

                            <div className='summ' onClick={hancleProyectsClick}>
                                <div className='title'>
                                    <p>Proyectos Activos</p>
                                    <Folder className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className='content'>
                                    <div className="text">5</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="recent-activities">
                            <NotificationList
                                title="Actividades Recientes"
                                items={recentActivities}
                                onItemClick={handleActivityClick}
                            />
                        </div>

                        <div className="notifications">
                            <NotificationList
                                title="Notificaciones"
                                items={notifications}
                                onItemClick={handleNotificationClick}
                            />
                        </div>
                    </div>
                </div>

                <div className='col-b'>
                    <div className='project-progress'>
                        <h2>Progreso de Proyectos</h2>
                        <ProjectProgress />
                    </div>

                    <div className="manage-orgs">
                        <h2>Administrar Organizaciones</h2>
                        <div className="org-list">
                            {organizations.map((org, index) => (
                                <div key={index} className="org-item">
                                    <span className="org-name">{org.name}</span>
                                    <button
                                        className="admin-button"
                                        onClick={() => handleManageClick(org.alias)}
                                    >
                                        Ver Org
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
