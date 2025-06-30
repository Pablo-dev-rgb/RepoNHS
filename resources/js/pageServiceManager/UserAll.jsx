import React, { useEffect } from "react";
import AuthUser from "../pageAuth/AuthUser";
import { useNavigate } from "react-router-dom";
 
const UserAll = () => {

    const {getRol} = AuthUser()
    const navigate = useNavigate()

    useEffect(()=>{
        const role = getRol()
        
            if(role !== "ServiceManager"){
                navigate("/denegado")
            }
        })

    return(
        <div className="container bg-light">
            <div className="row justify-content-center mt-5 mb-5">
                <div className="col-sm-12 mt-3 mb-3">
                    <h3 className="text-center">LISTA USUARIOS</h3>
                    <div className="card">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>NOMBRE</th><th>TELEFONO</th><th>CORREO ELECTRONICO</th><th>SERVICIO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAll