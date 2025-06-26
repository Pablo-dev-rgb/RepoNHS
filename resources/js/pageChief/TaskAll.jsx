import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import AuthUser from "../pageAuth/AuthUser";
import Config from "../Config";
import { Dropdown } from 'react-bootstrap';

const TaskAll = () => {

    const {getRol, getToken} = AuthUser()
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([])

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
        
        const isDelete = window.confirm("¿Desea borrar la tarea?")
            if(isDelete){
                await Config.taskDelete(token, id)
                getTaskAll()
            }
        }
    return(
         <div className="container bg-light">
                    <div className="row mt-5 mb-5">
                        <Sidebar/>
                        <div className="col-md-7 mt-3 mb-3">
                            
                            <Link to={`create`} className="btn btn-secondary">Crear tarea</Link>
                            <h3 className="text-center">Lista de tareas</h3>
                            <div className="mt-3 mb-3" style={{width: 'auto'}}>
                                <div className="card-body">
                                    {
                                        tasks.map((task)=>{
                                            return(
                                                <div className="card mt-3 mb-3 border-bottom" key={task.id}>
                                                    <div className="card-body d-flex flex-column">
                                                            <h5 className="card-title">{task.name}</h5>
                                                            <p className="card-service">{task.service.name}</p>
                                                            <p className="card-text">{task.description}</p>
                                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                                            <p className="card-time">{new Date(task.created_at).toLocaleDateString()}</p>
                                                            <Dropdown>
                                                                <Dropdown.Toggle className=" mb-3 " variant="secondary" id={`dropdown-basic-${task.id}`}>
                                                                    Opciones
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item as={Link} to={`edit/${task.id}`}>Editar</Dropdown.Item>
                                                                    <Dropdown.Item  onClick={()=>{submitDelete(task.id)}}>Eliminar</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                            {/* <Link to={`edit/${task.id}`} className="btn btn-primary me-3">Editar</Link>
                                                            <button className="btn btn-danger" onClick={()=>{submitDelete(task.id)}}>Eliminar</button> */}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }    
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
    )
}

export default TaskAll