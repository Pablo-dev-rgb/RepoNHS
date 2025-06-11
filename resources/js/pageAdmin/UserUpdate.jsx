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
        <div className="container bg-light">
            <div className="row justify-content-center mt-5 mb-5">
                <Sidebar/>
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-header">EDITAR USUARIO</div>
                        <div className="card-body">
                            <form onSubmit={submitUpdate}>
                                <div className="col-sm-12">
                                    <label htmlFor="name">Nombre:</label>
                                    <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} />
                                </div>
                                <div className="col-sm-12">
                                    <label htmlFor="name">Email:</label>
                                    <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} />
                                </div>
                                <div className="col-sm-12">
                                    <label htmlFor="name">Telefono:</label>
                                    <input type="tel" className="form-control" value={phone} onChange={(e)=>setPhone(e.target.value)} />
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
export default UserUpdate;