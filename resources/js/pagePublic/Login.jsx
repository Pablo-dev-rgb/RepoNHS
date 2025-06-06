import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Config from "../Config";
import AuthUser from "../pageAuth/AuthUser";

const Login = ()=>{

    const { setToken, getToken} = AuthUser()
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate()

    useEffect(()=>{
        if(getToken()){
             navigate("/")
        }
    },[])
    
    const submitLogin = async(e) => {
        e.preventDefault();
         await axios.get("/sanctum/csrf-cookie").then((response)=>{
            Config.getLogin({email,password})
            .then(({data})=>{
                if(data.success){
                    // console.log(data)
                    setToken(
                    data.user,
                    data.token,
                    data.user.roles[0].name
                )
            }else{
                setMessage(data.message)
            }
        })
     })
    }

    return(

        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-4">
                    <div className="card mt-5 mb-5">
                        <div className="card-body">
                            <h1 className="text-center fw-bolder">Login</h1>

                            <input type="email" className="form-control mt-3" placeholder="Email:" value={email} 
                            onChange={(e)=>setEmail(e.target.value)} required/>

                            <input type="password" className="form-control mt-3" placeholder="Contraseña:" value={password} 
                            onChange={(e)=>setPassword(e.target.value)} required/>
                            
                            <button onClick={submitLogin} className="btn btn-primary w-100 mt-3">Iniciar sesion</button>
                            <p className="text-center mt-3">{message}</p>
                            <hr />
                            <a href="/register" className="btn btn-primary w-100 mt-3">Registrarse</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login;