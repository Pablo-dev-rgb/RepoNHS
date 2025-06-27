import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { data, Link, useNavigate, useParams } from "react-router-dom";
import AuthUser from "../pageAuth/AuthUser";
import Config from "../Config";

const ServiceUpdate = ()=>{

    const {getToken} = AuthUser()
    const {id} = useParams()
    const [name, setName] = useState("");
    const [selectedHospitals, setSelectedHospitals] = useState('');
    const [hospitals, setHospitals] = useState([]);
    const navigate = useNavigate();
    const {getRol} = AuthUser()


    useEffect(()=>{
            const role = getRol()
    
            if(role !== "Admin"){
                navigate("/denegado")
            }
        })

    useEffect(()=>{
        const token = getToken()

        const getServiceById = async()=>{
            await Config.getServiceById(token, id)
            .then(({data})=>{
                setName(data.name || '')
            })
        };
        getServiceById();
    },[])

    useEffect(()=>{
        const token = getToken()

        const fetchHospitals = async()=>{
            const Hospitals = await Config.getHospitalsAll(token)
            setHospitals(Hospitals.data)
            if(Hospitals.data.length > 0){
                setSelectedHospitals(Hospitals.data[0].name);
            }
        }
        fetchHospitals()
    },[]);

    const submitUpdate = async(ev)=>{
        ev.preventDefault();

        const token = getToken();

        const dataService = {name};

        try{
            await Config.getServiceUpdate(token, dataService, id)
            navigate("/admin/service");
        } catch(err){
            alert("Error al actualizar servicio. Intentar nuevamente.");
        }
    };

    return(
        <div className="container bg-light">
            <div className="row justify-content-center mt-5 mb-5">
                <div className="col-sm-9 mt-3 mb-3">
                    <h3 className="text-center">EDITAR SERVICIO</h3>
                    <div className="card">
                        <div className="card-header">EDITAR SERVICIO</div>
                        <div className="card-body">
                            <form onSubmit={submitUpdate}>
                                <div className="col-sm-12">
                                    <label htmlFor="name">Nombre:</label>
                                    <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} />
                                </div>
                                <div className="col-sm-12">
                                    <label>Hospital:</label>
                                    <select className="form-control" value={selectedHospitals} onChange={(e) => setSelectedHospitals(Number(e.target.value))} required>
                                    {hospitals.map((hospital) => (
                                        <option key={hospital.id} value={hospital.id}>
                                            {hospital.name}
                                        </option>
                                    ))}
                                </select>
                                </div>
                                <div className="btn-group mt-3">
                                    <Link to={-1} className="btn btn-secondary">Volver</Link>
                                    <button type="submit" className="btn btn-primary">Actualizar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceUpdate