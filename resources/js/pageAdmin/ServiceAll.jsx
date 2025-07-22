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
            <div className="row justify-content-center m-5">
                <div className="col-md-10 mt-3 mb-3">
                    <h3 className="text-center text-white">Lista servicios</h3>
                    <Link to={`create`} className="btn btnblue">Crear Servicio</Link>
                    <div className="mt-3 mb-3">
                    <div className="card-body">
                            <table className="mt-3 mb-3" style={{
                                    border: 'none',
                                    borderRadius: '10px',
                                    overflow: 'hidden'
                                }}>
                                <thead style={{
                                        backgroundColor: '#468EBB',
                                        color: 'white'
                                    }}>
                                    <tr>
                                        <th className="px-4">Nombre</th>
                                        <th className="px-4">Hospital</th>
                                        <th className="px-4">Acción</th>
                                    </tr>
                                </thead>
                                <tbody style={{
                                        backgroundColor: '#34393C',
                                        color: 'white'
                                    }}>
                                    { !services ? (
                                        <tr className="border-top border-bottom border-secondary">
                                        <td className="p-3">...loading</td>
                                        </tr>
                                    ) : (
                                        services.map((service) => (
                                        <tr className="border-top border-bottom border-secondary" key={service.id}>
                                            <td className="p-3">{service.name}</td>
                                            <td className="p-3">{service.hospital.name}</td>
                                            <td className="p-3">
                                                <Link to={`edit/${service.id}`} className="btn btnblue">Editar</Link>
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
    )
}

export default ServiceAll;