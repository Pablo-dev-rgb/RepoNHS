import React, { useEffect, useState } from "react";
import AuthUser from "../pageAuth/AuthUser";
import { Link, useNavigate } from "react-router-dom";
import Config from "../Config";
import Sidebar from "./Sidebar";

const TaskCreate = () => {
    const {getRol, getToken} = AuthUser()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [selectedService, setSelectedService] = useState('')
    const [services, setServices] = useState([])

    useEffect(()=>{
        const role = getRol()
            if(role !== "Chief"){
                navigate("/denegado")
            }      
    })
    
    useEffect(() => {
        const token = getToken();
        const fetchData = async () => {
            try {
                const serviceRes = await Config.getServices(token)
                setServices(serviceRes.data);
                console.log(services);
                if (serviceRes.data.length > 0) {
                    setSelectedService(serviceRes.data[0].id);
                }
            } catch (err) {
                    console.error('Error al cargar los servicios:', err);
            }
        };
    fetchData();
    }, []);
    
    const submitStore = async (ev) => {
        const token = getToken()
        ev.preventDefault()
                
        await Config.taskStore(token, {
            name ,
            description,
            service_id: selectedService,
        });
        navigate("/chief/task");
    }

    return (
        <div className="container bg-light">
            <div className="row justify-content-center mt-5 mb-5">
                <Sidebar/>
                <div className="col-sm-6 mt-3 mb-3">
                    <div className="card">
                        <div className="card-header">CREAR TAREA</div>
                        <div className="card-body">
                            <form onSubmit={submitStore}>

                                <div className="col-sm-12">
                                    <label htmlFor="title">Nombre:</label>
                                    <input type="text" className="form-control " value={name} onChange={(e)=>setName(e.target.value)} />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="description">Descripción:</label>
                                    <textarea className="form-control" value={description} onChange={(e)=>setDescription(e.target.value)} />
                                </div>

                                <div className="col-sm-12">
                                    <label>Servicio:</label>
                                    <select className="form-control" value={selectedService} onChange={(e) =>setSelectedService(Number(e.target.value))} >
                                    {services.map((service) => (
                                        <option key={service.id} value={service.id}>
                                            {service.name}
                                        </option>
                                    ))}
                                </select>
                                </div>
                                
                                <div className="btn-group mt-3">
                                    <Link to={-1} className="btn btn-secondary">Volver</Link>
                                    <button type="submit" className="btn btn-primary">Crear</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskCreate