import React, { useEffect, useState } from "react";
import AuthUser from "../pageAuth/AuthUser";
import { Link, useNavigate, useParams } from "react-router-dom";
import Config from "../Config";
import Sidebar from "./Sidebar";

const UserUpdate = () =>{
    const navigate = useNavigate()
    const {getToken} = AuthUser();
    const {id} = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    // const [hospital, setHospital] = useState();
    // const [service, setService] = useState();
    const {getRol} = AuthUser()


    useEffect(()=>{
            const role = getRol()
    
            if(role !== "Admin"){
                navigate("/denegado")
            }
        })

    useEffect(()=>{
        const token = getToken();

        const getUserById = async ()=>{
            await Config.getUserById(token, id)
            .then(({data})=>{
                setName(data.name || '')
                setEmail(data.email || '')
                setPhone(data.phone || '')
            })
        };
        getUserById();
    },[])

    const submitUpdate = async (ev) => {
        ev.preventDefault();
        const token = getToken();

        const dataToSend = { name, email, phone };
            try {
                await Config.getUserUpdate(token, dataToSend, id);
                navigate("/admin/user");
            } catch (err) {
                alert('Error al actualizar el usuario. Por favor, inténtalo de nuevo.');
            }
    };
    
    return(
        <div className="row justify-content-center mt-5 mb-5">
            <div className="col-sm-9 mt-3 mb-3">
                <h3 className="text-center text-white">Editar Usuario</h3>
            </div>
            <div className="col-sm-6 mt-3 mb-3">
                <div className="card cardCreate">
                    <div className="card-header">EDITAR USUARIO</div>
                        <div className="card-body">
                        <form onSubmit={submitUpdate}>
                            <div className="col-sm-12">
                                <label htmlFor="name">Nombre:</label>
                                <input type="text" className="form-control mt-1 mb-2" value={name} onChange={(e)=>setName(e.target.value)} />
                            </div>
                            <div className="col-sm-12">
                                <label htmlFor="name">Email:</label>
                                <input type="email" className="form-control mt-1 mb-2" value={email} onChange={(e)=>setEmail(e.target.value)} />
                            </div>
                            <div className="col-sm-12">
                                <label htmlFor="name">Telefono:</label>
                                <input type="tel" className="form-control mt-1 mb-2" value={phone} onChange={(e)=>setPhone(e.target.value)} />
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
export default UserUpdate;