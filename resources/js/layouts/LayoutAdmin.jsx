import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const LayoutAdmin = ()=>{
    return(
        <>
        <h1>Admin</h1>
        <Navbar />
        <Outlet />
        <Footer />  
        </>
    )
}

export default LayoutAdmin;