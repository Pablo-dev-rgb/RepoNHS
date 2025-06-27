import React, { useEffect, useState } from "react";
import AuthUser from "../pageAuth/AuthUser";
import Config from "../Config";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";

const UserAll = () => {

    const {getToken} = AuthUser()
    const [users, setUsers] = useState();
    const navigate = useNavigate()
    const {getRol} = AuthUser()


    useEffect(()=>{
            const role = getRol()
    
            if(role !== "Admin"){
                navigate("/denegado")
            }
        })

    useEffect(()=>{
        getUserAll();
    },[])
    
    const getUserAll = async ()=>{
        const token = getToken()

        if(token){
        const response = await Config.getUserAll(token)
        //console.log(response.data)
        setUsers(response.data)
        }
    }

    return(
        <div className="container bg-light">
            <div className="row justify-content-center mt-5 mb-5">
                <div className="col-sm-12 mt-3 mb-3">
                    <h3 className="text-center">LISTA USUARIOS</h3>
                    <Link to={`/admin/register`} className="btn btn-secondary mt-3 mb-3">Registrar usuario</Link>
                    <div className="card">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>NOMBRE</th><th>SERVICIO</th><th>ACCION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { !users ? (
                                        <tr>
                                        <td>...loading</td>
                                        </tr>
                                    ) : (
                                        users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.service.name}</td>
                                            <td>
                                                <Link to={`edit/${user.id}`} className="btn btn-secondary">Editar</Link>
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

export default UserAll;