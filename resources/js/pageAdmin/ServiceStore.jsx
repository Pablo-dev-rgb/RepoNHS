import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { data, Link, Navigate, useNavigate } from "react-router-dom";
import AuthUser from "../pageAuth/AuthUser";
import Config from "../Config";

const ServiceStrore = () => {

    const {getToken} = AuthUser()
    const [name, setName] = useState('')
    const [selectHospital, setSelectedHospital] = useState('')
    const [hospitals, setHospitals] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
            const token = getToken();
            const fetchData = async () => {
                try {
                    const hospitalsRes = await Config.getHospitalsAll(token)
                    setHospitals(hospitalsRes.data);
                    if (hospitalsRes.data.length > 0) {
                        setSelectedHospital(hospitalsRes.data[0].id);
                    }
                } catch (err) {
                    console.error('Error al cargar los hospitales:', err);
                }
            };
            fetchData();
        }, []);
    
    const submitStore = async (ev) => {
        const token = getToken()
        ev.preventDefault()
        
        await Config.getServiceStore(token, {
            name ,
            hospital_id: selectHospital,
        });
        navigate("/admin/service");
    }

    return(
        <div className="container bg-light">
            <div className="row justify-content-center mt-5 mb-5">
                <Sidebar/>
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-header">CREAR SERVICIO</div>
                        <div className="card-body">
                            <form onSubmit={submitStore}>

                                <div className="col-sm-12">
                                    <label htmlFor="name">Nombre:</label>
                                    <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} />
                                </div>

                                <div className="col-sm-12">
                                    <label>Hospital:</label>
                                    <select className="form-control" value={selectHospital} onChange={(e) => setSelectedHospital(Number(e.target.value))} required>
                                    {hospitals.map((hospital) => (
                                        <option key={hospital.id} value={hospital.id}>
                                            {hospital.name}
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

export default ServiceStrore