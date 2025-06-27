import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import AuthUser from "../pageAuth/AuthUser";
import { useNavigate } from "react-router-dom";

const PanelAdmin = () => {

    const {getRol} = AuthUser()
    const navigate = useNavigate()


    useEffect(()=>{
            const role = getRol()
    
            if(role !== "Admin"){
                navigate("/denegado")
            }
        })

    return(
        
        <div className="container bg-light">
            <div className="row justify-content-center mt-5 mb-5">
                <div className="col-sm-9">
                    <h1 className="text-center">Administrador</h1>
                </div>
            </div>
        </div>
    )
}

export default PanelAdmin;