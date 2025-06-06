import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AuthUser = () =>{
    const navigate = useNavigate();

    //obtencion de datos
    const getToken = () => {
        const tokenString = sessionStorage.getItem("token");
        return tokenString ? JSON.parse(tokenString) : null;
    }

    const getUser = () => {
        const userString = sessionStorage.getItem("user");
        return userString ? JSON.parse(userString) : null;
    }

    const getRol = () => {
        const rolString = sessionStorage.getItem("rol");
        return rolString ? JSON.parse(rolString) : null;
    }

    //useState
    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());
    const [rol, setRol] = useState(getRol());

    //guardar la informacion
    const saveToken = (user, token, rol) => {
        sessionStorage.setItem("user", JSON.stringify(user))
        sessionStorage.setItem("token", JSON.stringify(token))
        sessionStorage.setItem("rol", JSON.stringify(rol))

        setUser(user)
        setToken(token)
        setRol(rol)

        //rol : admin|client
        if(getRol()==="Admin")
            navigate("/admin")
        if(getRol()==="ServiceManager")
            navigate("/servicemanager")
        if(getRol()==="Chief")
            navigate("/chief")
    }

    //destruccion de la sesion
    const getLogout = () => {
        sessionStorage.clear()
        navigate("/")
    }


    return{
        setToken:saveToken,
        token,
        user,
        rol,
        getToken, getUser, getRol, getLogout
    }
}

export default AuthUser;