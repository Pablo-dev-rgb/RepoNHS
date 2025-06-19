import React from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const TaskAll = () => {
    return(
         <div className="container bg-light">
                    <div className="row mt-5 mb-5">
                        <Sidebar/>
                        <div className="col-md-7">
                            <h3 className="mt-3">Lista de tareas</h3>
                            <Link to={`create`} className="btn btn-primary">Crear tarea</Link>
                            <div className="card mt-3 mb-3" style={{width: 'auto'}}>
                                <div className="card-body">
                                    {/*
                                        notices.map((notice)=>{
                                            return(
                                                <div className="border-bottom" key={notice.id}>
                                                    <div className="card-body">
                                                    <h5 className="card-title">{notice.title}</h5>
                                                        <p className="card-text">{notice.description}</p>
                                                        <Link to={`edit/${notice.id}`} className="btn btn-primary me-3">Editar</Link>
                                                        <button className="btn btn-danger" onClick={()=>{submitDelete(notice.id)}}>Eliminar</button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    */}
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
    )
}

export default TaskAll