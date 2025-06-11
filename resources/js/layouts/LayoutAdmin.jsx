import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const LayoutAdmin = ()=>{
    return(
        <>
        <Navbar />
        <Outlet />
        </>
    )
}

export default LayoutAdmin;