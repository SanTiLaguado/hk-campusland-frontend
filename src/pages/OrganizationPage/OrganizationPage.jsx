import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Button, Input, Form, message } from 'antd';
import Pic from '../../assets/avatar_placeholder.png';
import MemberCard from '../../components/MemberCard/MemberCard';
import { getUserId } from '../../services/AuthService';
import { getOrgInfo, getOrgMembers } from '../../services/OrganizationService';
import { getProjectsByOrg, createProject, assignProject } from '../../services/ProjectService'; // Importa ambas funciones
import './OrganizationPage.css';

const OrganizationPage = () => {
    const navigate = useNavigate();
    const { alias } = useParams();
    const userId = getUserId();
    const isAdmin = false;

    const [showModal, setShowModal] = useState(false);
    const [organization, setOrganization] = useState({});
    const [projects, setProjects] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchOrgInfo = async () => {
            if (!alias) {
                setError('Alias is not available');
                setLoading(false);
                return;
            }

            try {
                const orgData = await getOrgInfo(alias);
                setOrganization(orgData);

                const projectData = await getProjectsByOrg(orgData.id);
                setProjects(projectData);

                const memberData = await getOrgMembers(orgData.id);
                setMembers(memberData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrgInfo();
    }, [alias]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleManageClick = (projectId, OrgAlias) => {
        navigate(`/${OrgAlias}/${projectId}/board`);
    };

    const handleCreateClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        form.resetFields();
    };

    const handleCreateOrgSubmit = async (values) => {
        try {

            const newProjectData = {
                descripcion: values.descripcion,
                estadoProyecto: "ACTIVO",
                nombre: values.nombre,
                user: { id: userId }, 
            };

            const newProject = await createProject(newProjectData);
            

            await assignProject(organization.id, newProject.id);


            setProjects([...projects, newProject]);
            handleCloseModal();
        } catch (error) {
            message.error('Error al crear el proyecto ú asignarlo: ' + error.message);
        }
    };

    return (
        <section className="main" id="orgpage">
            <div className='column-1'>
                <div className='profile-info'>
                    <div className='org-photo'>
                        <img src={Pic} alt="Avatar de la Organización" className="profile-avatar" />
                    </div>
                    <div className='org-info'>
                        <h1>{organization.nombre}</h1>
                        <p>@{organization.alias}</p>
                        <button className='code-button'>Código de Invitación</button>
                    </div>
                </div>
                <div className='org-proyects'>
                    <h2>Proyectos</h2>
                    {projects.length === 0 ? (
                        <div>
                            <p className='no-proyects'>Esta organización no tiene proyectos creados.</p>
                            <button className="create-project-button" onClick={handleCreateClick}>Crear Proyecto</button>
                        </div>
                    ) : (
                        projects.map((proy, index) => (
                            <div key={proy.id} className="proy-item">
                                <div className='proy-info'>
                                    <span className="proyect-name">{proy.nombre} <br /></span>
                                    <span className="proyect">{proy.descripcion} <br /></span>
                                </div>
                                <button
                                    className="view-p-button"
                                    onClick={() => handleManageClick(proy.id, alias)}
                                >
                                    Ver
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className='column-2'>
                <h2>Miembros</h2>
                <div className='members-list'>
                    {members.length === 0 ? (
                        <p>No hay miembros en esta organización.</p>
                    ) : (
                        members.map((member, index) => (
                            <MemberCard
                                key={index}
                                profileImage={Pic}
                                nombre={`${member.nombre} ${member.apellido}`}
                                username={member.username}
                                isAdmin={isAdmin}
                            />
                        ))
                    )}
                </div>
            </div>

            <Modal
                title="Crear Proyecto"
                open={showModal}
                onCancel={handleCloseModal}
                footer={null}
                width={600}
            >
                <Form form={form} layout="vertical" onFinish={handleCreateOrgSubmit}>
                    <Form.Item
                        name="nombre"
                        label="Nombre"
                        rules={[{ required: true, message: 'Por favor ingresa el nombre del proyecto.' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="descripcion"
                        label="Descripción"
                        rules={[{ required: true, message: 'Por favor ingresa la descripción del proyecto.' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item>
                        <Button className='create-button' htmlType="submit">Guardar</Button>
                        <Button style={{ marginLeft: 8 }} onClick={handleCloseModal}>Cancelar</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </section>
    );
};

export default OrganizationPage;
