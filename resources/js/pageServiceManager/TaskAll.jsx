import React, { useEffect, useState } from "react";
import AuthUser from "../pageAuth/AuthUser";
import { Link, useNavigate } from "react-router-dom";
import Config from "../Config";
import ModalTask from "../components/Modals/ModalTask";
 
const TaskAll = () => {

    const {getRol, getToken} = AuthUser()
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([])
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(()=>{
        const role = getRol()
        
        if(role !== "ServiceManager"){
            navigate("/denegado")
        }
    })

    const fetchTasks = async () => {
            try {
                const token = getToken();
                const { data } = await Config.getTaskAllByService(token);
                if (data && data.length > 0) {
                    setTasks(data);
                }
            } catch (err) {
                console.error("Error al obtener las tareas:", err);
                setError("No se pudieron cargar las tareas. Inténtalo de nuevo más tarde.");
            }
        };
    
    useEffect(()=>{
        fetchTasks();
    }, []);

    const CompletedTask = async (taskId, newCompletedStatus) => {
        const token = getToken();

        try {
            await Config.updateTaskCompletion(taskId, newCompletedStatus, token);

            await fetchTasks();
             
        } catch (err) {
            console.error('Error al actualizar la tarea en la BD:', err);
            setError("Error al actualizar la tarea. Por favor, inténtalo de nuevo.");
        }
    };

    const handleOpenDetailModal = (task) => {
        setSelectedTask(task);
        setShowDetailModal(true);
    };

    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
        setSelectedTask(null);
    };

    return(
            <div className="row justify-content-center m-5">
                <div className="col-md-11 mt-3 mb-3">
                    <h3 className="text-center text-white">Lista Tarea</h3>
                        <div className="card-body d-flex justify-content-center">
                            <div className="table-responsive ">
                            <table className="mt-3 mb-3" style={{
                                    border: 'none',
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    tableLayout: 'fixed'
                                }}>
                                <thead className="" 
                                    style={{
                                        backgroundColor: '#468EBB',
                                        color: 'white'
                                    }}>
                                    <tr>
                                        <th className="px-4 description-title">Tarea</th>
                                        <th className="ps-4 pe-4">Descripción</th>
                                        <th className="px-4">Fecha</th>
                                        <th className="px-4">Completado</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody style={{
                                        backgroundColor: '#34393C',
                                        color: 'white'
                                    }}>
                                    {
                                        tasks.map((task)=>{
                                            return(
                                                <tr className="border-top border-bottom border-secondary" key={task.id}>
                                                    <td className="p-3" style={{width: '180px;'}}>{task.name}</td>
                                                    <td className="py-3 pe-3 description-cell">{task.description}</td>
                                                    <td className="text-center py-3 pe-3">{new Date(task.created_at).toLocaleDateString()}</td>
                                                    <td className="text-center py-3 pe-3">
                                                        <div className="form-check form-switch d-inline-block">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                role="switch"
                                                                id={`taskSwitch-${task.id}`}
                                                                checked={task.completed}
                                                                onChange={() => CompletedTask(task.id, !task.completed)}
                                                            />
                                                            <label className="form-check-label visually-hidden" htmlFor={`taskSwitch-${task.id}`}>
                                                                Tarea "{task.name}" Completada
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <button as={Link} onClick={() => handleOpenDetailModal(task)} className="m-3 btn btnblue">Ver</button>
                                                        <ModalTask show={showDetailModal} onHide={handleCloseDetailModal} taskData={selectedTask} />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    } 
                                </tbody>
                            </table>
                            </div>
                        </div>
                </div>
            </div>
    )
}

export default TaskAll