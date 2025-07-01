import React, { useEffect, useState } from "react";
import AuthUser from "../pageAuth/AuthUser";
import { useNavigate } from "react-router-dom";
import Config from "../Config";
 
const TaskAll = () => {

    const {getRol, getToken} = AuthUser()
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([])

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

    return(
        <div className="container bg-light">
            <div className="row justify-content-center mt-5 mb-5">
                <div className="col-sm-12 mt-3 mb-3">
                    <h3 className="text-center">Lista Tarea</h3>
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive ">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Tarea</th>
                                        <th>Descripción</th>
                                        <th>Fecha</th>
                                        <th>Completado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tasks.map((task)=>{
                                            return(
                                                <tr className="border-top border-bottom border-secondary" key={task.id}>
                                                    <td className="py-3 pe-3">{task.name}</td>
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
            </div>
        </div>
    )
}

export default TaskAll