import React from "react";
import AuthUser from "../pageAuth/AuthUser";
import Config from "../Config";

const Navbar = () =>{

    const {getRol, getLogout, getToken, user} = AuthUser()

    const logoutUser = () =>{
      const token = getToken(); 

    if (token) {
      Config.getLogout(token) 
        .then(response => {
          console.log(response);
          getLogout();
        })
        .catch(error => {
          console.error("Logout failed:", error);
          // Handle logout error (e.g., display a message to the user)
        });
      }
  }

    const renderLinks = () =>{
        if(getToken()){
            return(
                <>
                <li className="nav-item">
                    <a className="nav-link" href={`/${getRol()}`} >Administracion | {user.name} </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={logoutUser}>Logout</a>
                </li>
                </>
            )
        }else{
            return(
                <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                </li>
            )
        }
    }
    
    return(
        <nav className="navbar navbar-expand-lg bg-light shadow-sm">
        <div className="container">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto"></ul>
            <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/categorias">Categorias</a>
                </li>
            </ul>
            <ul className="navbar-nav ms-auto">
            {renderLinks()}
            </ul>
            </div>
        </div>
        </nav>
    )
}

export default Navbar;