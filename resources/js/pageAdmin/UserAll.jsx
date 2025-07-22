import React, { useEffect, useState } from "react";
import AuthUser from "../pageAuth/AuthUser";
import Config from "../Config";
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
        <div className="row justify-content-center mt-5 mb-5">
            <div className="col-md-10 mt-3 mb-3">
                <h3 className="text-center text-white">Lista de Usuarios</h3>
                <Link to={`/admin/register`} className="btn btnblue">Registrar usuario</Link>
                <div className="mt-3 mb-3">
                    <div className="card-body d-flex justify-content-center">
                        <table style={{
                            border: 'none',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            width: '100%'
                        }}>
                            <thead className="" style={{
                                backgroundColor: '#468EBB',
                                color: 'white'
                            }}>
                                <tr>
                                    <th className="px-4">Nombre</th>
                                    <th className="px-4">Telefono</th>
                                    <th className="px-4">Servicio</th>
                                    <th className="px-4">Acción</th>
                                </tr>
                            </thead>
                            <tbody style={{
                                backgroundColor: '#34393C',
                                color: 'white'
                            }}>
                                { !users ? (
                                    <tr className="border-top border-bottom border-secondary">
                                        <td className="p-3">...loading</td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                    <tr className="border-top border-bottom border-secondary" key={user.id}>
                                        <td className="p-3">{user.name}</td>
                                        <td className="p-3">{user.phone}</td>
                                        <td className="p-3">{user.service.name}</td>
                                        <td className="p-3">
                                        <Link to={`edit/${user.id}`} className="btn btnblue">Editar</Link>
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

export default UserAll;