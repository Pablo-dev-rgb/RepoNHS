import React, { useEffect, useState } from "react";
import AuthUser from "../pageAuth/AuthUser";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Config from "../Config";

const TaskEdit = () => {

    const {getRol, getToken} = AuthUser()
    const {id} = useParams()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [serviceId, setServiceId] = useState()
    const [selectedService, setSelectedService] = useState('')
    const [services, setServices] = useState([])

    useEffect(()=>{
            const role = getRol()
                if(role !== "Chief"){
                    navigate("/denegado")
                }      
        })

    useEffect(()=>{
        const token = getToken();
        
        const getTask = async ()=>{
            await Config.getTaskById(token, id)
            .then(({data})=>{
                setName(data.name || '')
                setDescription(data.description || '')
                setServiceId(data.service_id || '')
            })
        };
        getTask();
    },[])
    
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

    const submitUpdate = async (ev) => {
            ev.preventDefault();
            
            const token = getToken();
            
            try{
                await Config.taskUpdate(token, id,
                    {
                        name,
                        description,
                        service_id: selectedService,
                    }
                )
                navigate("/chief/task");
            } catch(err){
                alert("Error al actualizar la tarea. Intentar nuevamente.");
            }
        }

    return(
            <div className="row justify-content-center mt-5 mb-5">
                 <div className="col-sm-9 mt-3">
                    <h1 className="text-center text-white">Editar tarea</h1>
                </div>
                <div className="col-sm-6 mt-3 mb-3">
                    <div className="card cardEdit">
                        <div className="card-header">EDITAR TAREA</div>
                        <div className="card-body">
                            <form onSubmit={submitUpdate}>

                                <div className="col-sm-12">
                                    <label htmlFor="title">Nombre:</label>
                                    <input type="text" className="form-control mt-1 mb-2" value={name} onChange={(e)=>setName(e.target.value)} />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="description">Descripción:</label>
                                    <textarea className="form-control mt-1 mb-2" value={description} onChange={(e)=>setDescription(e.target.value)} />
                                </div>

                                <div className="col-sm-12">
                                    <label>Servicio:</label>
                                    <select className="form-control mt-1 mb-2" value={selectedService} onChange={(e) =>setSelectedService(Number(e.target.value))} >
                                    {services.map((service) => (
                                        <option key={service.id} value={service.id}>
                                            {service.name}
                                        </option>
                                    ))}
                                </select>
                                </div>
                                
                                <div className="mt-3 d-flex justify-content-end">
                                    <Link to={-1} className="btn btn-secondary me-3">Volver</Link>
                                    <button type="submit" className="btn btnblue">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default TaskEdit