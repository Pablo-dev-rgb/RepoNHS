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
                       
                        <div className="col-md-12 mt-3 mb-3">
                            
                            <Link to={`create`} className="btn btn-secondary">Crear tarea</Link>
                            <h3 className=" text-center">Lista de tareas</h3>
                            <div className="mt-3 mb-3" style={{width: 'auto'}}>
                                <div className="card-body">
                                    <table className="mt-3 mb-3">
                                                    <thead>
                                                        <tr>
                                                            <th className="px-5">Tarea</th>
                                                            <th className="px-5">Servicio</th>
                                                            <th className="ps-4 pe-4">Descripcion</th>
                                                            <th className="px-5">Fecha</th>
                                                            <th className="px-5">Completado</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        tasks.map((task)=>{
                                                            return(
                                                                <tr className="border-top border-bottom border-secondary">
                                                                    <td className="py-3 pe-3">{task.name}</td>
                                                                    <td className="py-3 pe-3">{task.service.name}</td>
                                                                    <td className="py-3 pe-3">{task.description}</td>
                                                                    <td className="text-center py-3 pe-3">{new Date(task.created_at).toLocaleDateString()}</td>
                                                                    <td className="text-center py-3 pe-3">{task.completed}</td>
                                                                    <td className="py-3 pe-3"> 
                                                                        <Dropdown>
                                                                            <Dropdown.Toggle className="mb-3 " variant="secondary" id={`dropdown-basic-${task.id}`}>
                                                                                Opciones
                                                                            </Dropdown.Toggle>

                                                                            <Dropdown.Menu>
                                                                                <Dropdown.Item as={Link} to={`edit/${task.id}`}>Ver</Dropdown.Item>
                                                                                <Dropdown.Item as={Link} to={`edit/${task.id}`}>Editar</Dropdown.Item>
                                                                                <Dropdown.Item  onClick={()=>{submitDelete(task.id)}}>Eliminar</Dropdown.Item>
                                                                                
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
            </div>
    )
}

export default TaskAll