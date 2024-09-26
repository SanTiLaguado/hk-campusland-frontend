import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTaskByProject, createTask } from '../../services/TaskService';
import { Modal, Button, Input, Form, DatePicker, message, InputNumber, Select } from 'antd';
import './Board.css';

const { TextArea } = Input;

const Board = () => {
    const { projectId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form] = Form.useForm();
    const statuses = ['PENDIENTE', 'EN_PROGRESO', 'COMPLETADA'];

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasks = await getTaskByProject(projectId);
                setTasks(tasks);
            } catch (error) {
                console.error('Error al obtener las tareas:', error);
            }
        };
        fetchTasks();
    }, [projectId]);

    const handleCreateTask = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        form.resetFields();
    };

    const handleCreateTaskSubmit = async (values) => {
        try {
            const response = await createTask({
                nombre: values.nombre,
                descripcion: values.descripcion,
                startAt: values.startAt.format('YYYY-MM-DDTHH:mm:ss'),
                endAt: values.endAt.format('YYYY-MM-DDTHH:mm:ss'),
                horasEstimadas: values.horasEstimadas,
                proyecto: { id: projectId },
                tipoTarea: { id: values.tipoTarea },
                estadoTarea: values.estadoTarea
            });
            message.success('Tarea creada exitosamente');
            setTasks([...tasks, response]);
            handleCloseModal();
        } catch (error) {
            message.error('Error al crear la tarea');
        }
    };

    return (
        <section className="main" id="board">
            <div className="board-header">
                <h1>Tablero</h1>
                <button className="create-task-button" onClick={handleCreateTask}>
                    + Crear Tarea
                </button>
            </div>
            <div className="dashboard">
                <div className="task-list">
                    <h2>Todas las Tareas</h2>
                    {tasks.map((task) => (
                        <div
                        key={task.id}
                        className="task"
                        onClick={() => handletaskClick(task.id)}
                    >
                        <span>{task.nombre}</span>
                        <span className={`status ${task.estadoTarea}`}>
                            {task.estadoTarea}
                        </span>
                    </div>
                    ))}
                </div>
                <div className="board">
                    {statuses.map((status) => (
                        <div key={status} className="list">
                            <h2>{status}</h2>
                            <div className="cards">
                                {tasks
                                    .filter((task) => task.estadoTarea === status)
                                    .map((task) => (
                                        <div
                                            key={task.id}
                                            className="task"
                                            onClick={() => handletaskClick(task.id)}
                                        >
                                            <span>{task.nombre}</span>
                                            <span className={`status ${task.estadoTarea}`}>
                                                {task.estadoTarea}
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                title="Crear Tarea"
                open={showModal}
                onCancel={handleCloseModal}
                footer={null}
                width={600}
            >
                <Form form={form} layout="vertical" onFinish={handleCreateTaskSubmit}>
                    <Form.Item
                        name="nombre"
                        label="Nombre"
                        rules={[{ required: true, message: 'Por favor ingresa el nombre de la tarea.' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="descripcion"
                        label="Descripción"
                        rules={[{ required: true, message: 'Por favor ingresa la descripción de la tarea.' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        name="startAt"
                        label="Fecha de Inicio"
                        rules={[{ required: true, message: 'Por favor selecciona la fecha de inicio.' }]}
                    >
                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item
                        name="endAt"
                        label="Fecha de Fin"
                        rules={[{ required: true, message: 'Por favor selecciona la fecha de fin.' }]}
                    >
                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item
                        name="horasEstimadas"
                        label="Horas Estimadas"
                        rules={[{ required: true, message: 'Por favor ingresa las horas estimadas.' }]}
                    >
                        <InputNumber min={1} max={100} />
                    </Form.Item>
                    <Form.Item
                        name="tipoTarea"
                        label="Tipo de Tarea"
                        rules={[{ required: true, message: 'Por favor selecciona el tipo de tarea.' }]}
                    >
                        <Select>
                            <Select.Option value={1}>Tipo 1</Select.Option>
                            <Select.Option value={2}>Tipo 2</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="estadoTarea"
                        label="Estado de la Tarea"
                        rules={[{ required: true, message: 'Por favor selecciona el estado de la tarea.' }]}
                    >
                        <Select>
                            {statuses.map((status) => (
                                <Select.Option key={status} value={status}>
                                    {status}
                                </Select.Option>
                            ))}
                        </Select>
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

export default Board;
