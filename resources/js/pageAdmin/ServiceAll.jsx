import React, { useEffect, useState } from "react";
import AuthUser from "../pageAuth/AuthUser";
import Config from "../Config";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";

const ServiceAll = () => {

    const {getToken} = AuthUser()
    const [services, setServices] = useState();
    const navigate = useNavigate()
    const {getRol} = AuthUser()


    useEffect(()=>{
            const role = getRol()
    
            if(role !== "Admin"){
                navigate("/denegado")
            }
        })

    useEffect(()=>{
        getServicesAll();
    },[])
    
    const getServicesAll = async ()=>{
        const token = getToken()

        if(token){
        const response = await Config.getServicesAll2(token)
        // console.log(response.data)
        setServices(response.data)
        }
    }

    return(
        <div className="container bg-light">
            <div className="row justify-content-center mt-5 mb-5">
                <div className="col-sm-12 mt-3 mb-3">
                    <h3 className="text-center">LISTA SERVICIOS</h3>
                    <Link to={`create`} className="btn btn-secondary">Crear Servicio</Link>
                    <div className="card mt-3 mb-3">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>NOMBRE</th><th>HOSPITAL</th><th>ACCION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { !services ? (
                                        <tr>
                                        <td>...loading</td>
                                        </tr>
                                    ) : (
                                        services.map((service) => (
                                        <tr key={service.id}>
                                            <td>{service.name}</td>
                                            <td>{service.hospital.name}</td>
                                            <td>
                                                <Link to={`edit/${service.id}`} className="btn btn-secondary">Editar</Link>
                                            </td>
                                        </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceAll;