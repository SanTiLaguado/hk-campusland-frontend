import React, { useEffect, useState } from 'react';
import { Modal, Button, Input, Form, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../../services/AuthService';
import { getUserOrgs, createOrganization, addUserToOrganization } from '../../services/OrganizationService';
import './Organizations.css';

const Organizations = () => {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [form] = Form.useForm();
    const userId = getUserId();
    const navigate = useNavigate();

    const handleViewClick = (orgAlias) => {
        navigate(`/${orgAlias}`);
    };

    const handleCreateOrgClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        form.resetFields();
    };

    const handleCreateOrgSubmit = async (values) => {
        try {
            const newOrgData = {
                alias: values.alias,
                descripcion: values.description,
                nombre: values.name,
                usuarioCreador: { id: userId }
            };
    
            console.log(newOrgData)

            const createdOrg = await createOrganization(newOrgData);
            console.log(createdOrg)
            
            await addUserToOrganization(createdOrg.id, userId);
            
            message.success('Organización creada exitosamente.');
            handleCloseModal();
            
            const updatedOrgs = await getUserOrgs(userId);
            setOrganizations(updatedOrgs);
            
        } catch (error) {
            message.error('Error al crear la organización o asociar al usuario.');
        }
    };
    

    useEffect(() => {
        const fetchOrganizations = async () => {
            if (!userId) {
                setError('User ID is not available');
                setLoading(false);
                return;
            }

            try {
                const data = await getUserOrgs(userId);
                setOrganizations(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrganizations();
    }, [userId]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="main" id="organizations">
            <h1>Organizaciones</h1>
            <div className="organizations-grid">
                {organizations.map((org) => (
                    <div key={org.alias} className="organization-box">
                        <h2>{org.nombre}</h2>
                        <button className="view-button" onClick={() => handleViewClick(org.alias)}>Ver</button>
                    </div>
                ))}
                <div className="organization-box create-organization-box">
                    <button className="create-button" onClick={handleCreateOrgClick}>
                        Crear Organización
                    </button>
                </div>
            </div>

            <Modal
                title="Crear Organización"
                open={showModal}
                onCancel={handleCloseModal}
                footer={null}
                width={600}
            >
                <Form form={form} layout="vertical" onFinish={handleCreateOrgSubmit}>
                    <Form.Item
                        name="name"
                        label="Nombre"
                        rules={[{ required: true, message: 'Por favor ingresa el nombre de la Organización.' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Descripción"
                        rules={[{ required: true, message: 'Por favor ingresa la descripción de la organización.' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        name="alias"
                        label="Alias"
                        rules={[{ required: true, message: 'Por favor ingresa el alias de la organización.' }]}
                    >
                        <Input />
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

export default Organizations;
