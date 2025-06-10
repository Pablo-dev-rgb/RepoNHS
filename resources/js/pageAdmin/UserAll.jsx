import React, { useEffect, useState } from "react";
import AuthUser from "../pageAuth/AuthUser";
import Config from "../Config";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const UserAll = () => {

    const {getToken} = AuthUser()
    const [users, setUsers] = useState();

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
                <Sidebar/>
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-header">LISTA USUARIOS</div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th><th>NOMBRE</th><th>ACCION</th>
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
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>
                                                <Link to={`edit/${user.id}`} className="btn btn-primary">Editar</Link>
                                            </td>
                                        </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                             <Link to={`/admin/register`} className="btn btn-primary mt-3">Registrar usuario</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAll;