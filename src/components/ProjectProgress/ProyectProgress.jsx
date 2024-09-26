import React from 'react';
import './ProyectProgress.css'

const ProgressBar = ({ project, progress }) => {
    return (
        <div className="progress-bar-container">
            <div className="project-info">
                <span>{project}</span>
                <span>{progress}%</span>
            </div>
            <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
};

const ProjectProgress = () => {
    const projects = [
        { name: 'Proyecto A', progress: 25 },
        { name: 'Proyecto B', progress: 50 },
        { name: 'Proyecto C', progress: 75 },
        { name: 'Proyecto C', progress: 75 }
    ];

    return (
        <div className="progress-chart">
            {projects.map((project, index) => (
                <ProgressBar key={index} project={project.name} progress={project.progress} />
            ))}
        </div>
    );
};

export default ProjectProgress;
