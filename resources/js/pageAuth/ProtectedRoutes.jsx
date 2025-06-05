import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthUser from "./AuthUser";

const ProtectedRoutes = () =>{
    
    //vericar si tiene token
    const {getToken} = AuthUser()
    if(!getToken()){
        return <Navigate to={"/login"} />
    } 

    return(
        <div>
            <Outlet/>
        </div>
    )
}

export default ProtectedRoutes;