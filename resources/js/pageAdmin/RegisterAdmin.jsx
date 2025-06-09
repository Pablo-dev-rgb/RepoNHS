import React, { useEffect, useState } from "react";
import Config from "../Config";
import { Link, useNavigate } from "react-router-dom";
import AuthUser from "../pageAuth/AuthUser";

const Register = () =>{

    const {getToken} = AuthUser()
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate()
    
    const submitRegistro = async(e) => {
        const token = getToken();
        e.preventDefault();

        Config.getRegister(token, {name,email,password})
        .then(({data})=>{
            if(data.success){
                navigate("/admin")
            }
        })
    }

    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-4">
                    <div className="card mt-5 mb-5">
                        <div className="card-body">
                            <h1 className="text-center fw-bolder">Registro</h1>
                            <input type="text" className="form-control mt-3" placeholder="Nombre:" value={name} 
                            onChange={(e)=>setName(e.target.value)} required/>

                            <input type="email" className="form-control mt-3" placeholder="Email:" value={email} 
                            onChange={(e)=>setEmail(e.target.value)} required/>

                            <input type="password" className="form-control mt-3" placeholder="Contraseña:" value={password} 
                            onChange={(e)=>setPassword(e.target.value)} required/>
                            
                            <button onClick={submitRegistro} className="btn btn-primary w-100 mt-3">Registrarse</button>
                            <Link to={-1} className="btn btn-secondary w-100 mt-3">Volver</Link>
                            <p className="text-center mt-3"><a href="#" className="small text-decoration-none">Términos y condiciones</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;