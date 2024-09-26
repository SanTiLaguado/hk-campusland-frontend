import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Projects.css';

const Projects = () => {
    const navigate = useNavigate();

    const handleProyectClick = (orgAlias, projectName) => {
        navigate(`/${orgAlias}/${projectName}/board`);
    };

    const handlePersonalProyectClick = (projectName) => {
        navigate(`/${projectName}/board`);
    };
    

    const organizations = [
        {
            "name": "Organización 1",
            "alias": "organizacion-1",
            "projects": [
                { "id": 1, "name": "Proyecto A", "status": "ACTIVO", "organizationId": 1 },
                { "id": 2, "name": "Proyecto B", "status": "ACTIVO", "organizationId": 1 },
                { "id": 3, "name": "Proyecto C", "status": "COMPLETADO", "organizationId": 1 },
                { "id": 4, "name": "Proyecto D", "status": "ACTIVO", "organizationId": 1 },
                { "id": 5, "name": "Proyecto E", "status": "COMPLETADO", "organizationId": 1 },
                { "id": 6, "name": "Proyecto F", "status": "COMPLETADO", "organizationId": 1 }
            ]
        },
        {
            "name": "Organización 2",
            "alias": "organizacion-2",
            "projects": [
                { "id": 7, "name": "Proyecto C", "status": "ACTIVO", "organizationId": 2 }
            ]
        }
    ];

    const personalProjects = [
        { "id": 8, "name": "GYM", "status": "ACTIVO", "organizationId": null },
        { "id": 9, "name": "Aprender React", "status": "COMPLETADO", "organizationId": null }
    ];


    //mejora para futuras versiones, al darle click al proyecto se abre un modal con info, y un boton de "ver tablero"
    
    return (
        <section className="main" id="projects">
            <h1>Proyectos</h1>
            <div className="organization-list">
                {organizations.map((org, index) => (
                    <div key={index} className="organization">
                        <h2>{org.name}</h2>
                        <div className="project-list">
                            {org.projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="project"
                                    onClick={() => handleProyectClick(org.alias, project.name)}
                                >
                                    <span>{project.name}</span>
                                    <span className={`status ${project.status}`}>
                                        {project.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {personalProjects.length > 0 && (
                    <div className="organization">
                        <h2>Proyectos Personales</h2>
                        <div className="project-list">
                            {personalProjects.map((project) => (
                                <div key={project.id} className="project" onClick={() => handlePersonalProyectClick(project.name)}>
                                    <span>{project.name}</span>
                                    <span className={`status ${project.status}`}>
                                        {project.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
