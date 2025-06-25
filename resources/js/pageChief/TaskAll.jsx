import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import AuthUser from "../pageAuth/AuthUser";
import Config from "../Config";

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
                        <div className="col-md-7">
                            <h3 className="mt-3">Lista de tareas</h3>
                            <Link to={`create`} className="btn btn-primary">Crear tarea</Link>
                            <div className="card mt-3 mb-3" style={{width: 'auto'}}>
                                <div className="card-body">
                                    {
                                        tasks.map((task)=>{
                                            return(
                                                <div className="border-bottom" key={task.id}>
                                                    <div className="card-body">
                                                            <h5 className="card-title">{task.name}</h5>
                                                            <p className="card-text">{task.description}</p>
                                                            <p className="card-time">{task.created_at}</p>
                                                            <p className="card-service">{task.service.name}</p>
                                                            <Link to={`edit/${task.id}`} className="btn btn-primary me-3">Editar</Link>
                                                            <button className="btn btn-danger" onClick={()=>{submitDelete(task.id)}}>Eliminar</button>
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