import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import AuthUser from "../pageAuth/AuthUser";
import Config from "../Config";
import { Dropdown } from 'react-bootstrap';
import ModalTask from '../components/Modals/ModalTask';
import ModalDeleteTask from "../components/Modals/ModalDeleteTask";

const TaskAll = () => {

    const {getRol, getToken} = AuthUser()
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([])
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [taskIdToDelete, setTaskIdToDelete] = useState(null); 

     useEffect(()=>{
             const role = getRol()
    
            if(role !== "Chief"){
                navigate("/denegado")
            }
        })
    
    useEffect(()=>{
        getTaskAll()
    },[])
    
    const getTaskAll = async() => {
        const token = getToken()
        await Config.getTaskAll(token)
        .then(({data})=>{
            if(data.length > 0){
                setTasks(data)
            }
        })
            // console.log(response)
            // setNotices(response)
    }

    const submitDelete = async (id) => {
        const token = getToken()
        
            if(token){
                await Config.taskDelete(token, id)
                handleCloseDeleteModal();
                getTaskAll()
            }
        }

    //ModalDetail
    const handleOpenDetailModal = (task) => {
        setSelectedTask(task);
        setShowDetailModal(true);
    };

    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
        setSelectedTask(null);
    };

    //ModalDelete
    const handleOpenDeleteModal = (taskId) => {
        setTaskIdToDelete(taskId);
        setShowDeleteConfirmModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteConfirmModal(false);
        setTaskIdToDelete(null);
    };

    return(   
        <div className="row justify-content-center m-5">
                <div className="col-md-11 mt-3 mb-3">   
                    <h3 className="text-center text-white">Lista de tareas</h3>
                    <Link to={`create`} className="btn btnblue">Crear tarea</Link>
                    <div className="mt-3 mb-3">
                        <div className="card-body d-flex">
                            <div className="table-responsive "> 
                                <table style={{
                                    border: 'none',
                                    borderRadius: '10px',
                                    overflow: 'hidden'
                                }}>
                                    <thead className="" 
                                    style={{
                                        backgroundColor: '#468EBB',
                                        color: 'white'
                                    }}>
                                        <tr>
                                            <th className="px-4 description-title">Tarea</th>
                                            <th className="ps-4 pe-4">Descripcion</th>
                                            <th className="px-4">Servicio</th>
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
                                                    <td className="p-3">{task.name}</td>
                                                    <td className="py-3 pe-3 description-cell">{task.description}</td>
                                                    <td className="py-3 pe-3">{task.service.name}</td>
                                                    <td className="text-center py-3 pe-3">{new Date(task.created_at).toLocaleDateString()}</td>
                                                    <td className="text-center py-3 pe-3">
                                                        <div className="form-check form-switch d-inline-block">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                role="switch"
                                                                id={`taskSwitch-${task.id}`}
                                                                checked={task.completed}    
                                                                disabled
                                                            />
                                                            <label className="form-check-label visually-hidden" htmlFor={`taskSwitch-${task.id}`}>
                                                                Tarea "{task.name}" Completada
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 pe-3"> 
                                                        <Dropdown>
                                                            <Dropdown.Toggle className="mb-3 btnblue" variant="secondary" id={`dropdown-basic-${task.id}`}>
                                                                Opciones
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item as={Link} onClick={() => handleOpenDetailModal(task)}>Ver</Dropdown.Item>
                                                                <ModalTask show={showDetailModal} onHide={handleCloseDetailModal} taskData={selectedTask} />
                                                                <Dropdown.Item as={Link} to={`edit/${task.id}`}>Editar</Dropdown.Item>
                                                                <Dropdown.Item className="text-danger" onClick={()=>{handleOpenDeleteModal(task.id)}}>Eliminar</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
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
                <ModalDeleteTask
                    show={showDeleteConfirmModal}
                    onHide={handleCloseDeleteModal}
                    taskId={taskIdToDelete} // Pasa el ID de la noticia a eliminar
                    onConfirm={submitDelete} // Pasa la función que se ejecutará al confirmar
                />
        </div>
    )
}

export default TaskAll