import React, { useEffect } from "react";
import AuthUser from "../pageAuth/AuthUser";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const PanelChief = () => {
    const {getRol} = AuthUser()
    const navigate = useNavigate()

    useEffect(()=>{
        const role = getRol()

        if(role !== "Chief"){
            navigate("/denegado")
        }
    })
    

    return (
        <div className="container bg-light">
            <div className="row justify-content-center mt-5 mb-5">

                <div className="col-sm-9">
                    <h1 className="text-center">Gerente</h1>
                </div>
            </div>
        </div>
    )
}

export default PanelChief