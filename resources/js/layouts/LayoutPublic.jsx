import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const LayoutPublic = ()=>{
    return(
        <>
        <h1>Public</h1>
        <Navbar />
        <Outlet />
        </>
    )
}

export default LayoutPublic;