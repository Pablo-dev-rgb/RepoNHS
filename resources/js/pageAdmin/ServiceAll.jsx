import React, { useEffect, useState } from "react";
import AuthUser from "../pageAuth/AuthUser";
import Config from "../Config";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const ServiceAll = () => {

    const {getToken} = AuthUser()
    const [services, setServices] = useState();

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
                <Sidebar/>
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-header">LISTA SERVICIOS</div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th><th>NOMBRE</th><th>HOSPITAL</th><th>ACCION</th>
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
                                            <td>{service.id}</td>
                                            <td>{service.name}</td>
                                            <td>{service.hospital_id}</td>
                                            <td>
                                                <Link to={`edit/${service.id}`} className="btn btn-primary">Editar</Link>
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