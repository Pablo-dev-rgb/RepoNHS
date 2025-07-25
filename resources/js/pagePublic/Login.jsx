import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Config from "../Config";
import AuthUser from "../pageAuth/AuthUser";

const Login = ()=>{

    const { setToken, getToken} = AuthUser()
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    useEffect(()=>{
        if(getToken()){
             navigate("/")
        }
    },[])
    
    const submitLogin = async(e) => {
        e.preventDefault();
        try {
        await axios.get("/sanctum/csrf-cookie");
        const { data } = await Config.getLogin({ email, password });
        // Si la solicitud fue exitosa (código 200 OK) pero el backend dice success: false
        if (data.success) {
            if (data.user && data.user.roles && data.user.roles.length > 0) {
                setToken(
                    data.user,
                    data.token,
                    data.user.roles[0].name
                );
            }
        }
        } catch (error) {
            if (error.response) {
                // El servidor respondió con un código de estado fuera de 2xx
                setMessage(error.response.data.message || 'Contraseña y/o email incorrecto.');
            }
        }
    }

    return(
        <div style={{
            backgroundImage: 'url("/img/fondoLogin.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
            <div className="row justify-content-center w-100 m-0">
                <div className="col-sm-8 col-md-6 col-lg-4 d-flex justify-content-center">
                    <div className="cardLogin">
                        <div className="card-body me-4 ms-4">
                                <h1 className="text-center fw-bolder mb-5">Inicio de sesión</h1>

                                <input type="email" className="form-control mt-5 mb-3" placeholder="Email:" value={email} 
                                onChange={(e)=>setEmail(e.target.value)} required/>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control mt-3"
                                    placeholder="Contraseña:"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                {/* LA NUEVA CASILLA DE VERIFICACIÓN */}
                                <div className="form-check mt-3 p-0">
                                    <input
                                    type="checkbox"
                                    className="form-control-input"
                                    id="showPasswordCheckbox"
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)} // Invierte el estado
                                    />
                                    <label className="form-check-label" htmlFor="showPasswordCheckbox">
                                    Mostrar contraseña
                                    </label>
                                </div>

                                {message && (
                                <p className="text-center mt-3" style={{fontSize: '15px',color: 'white', textDecoration: 'underline', textDecorationColor: '#30A1E5'}}>
                                {message}
                                </p>
                                )}
                                
                                <button onClick={submitLogin} className="btn btnblue w-100 mt-3 mb-4" style={{borderRadius:'20px', height:'50px'}}>Iniciar sesion</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Login;