import React from "react";
import AuthUser from "../pageAuth/AuthUser";
import Config from "../Config";
import { Dropdown } from 'react-bootstrap';

const Navbar = () =>{

    const {getRol, getLogout, getToken, user} = AuthUser()

    const logoutUser = () =>{
      const token = getToken(); 

    if (token) {
      Config.getLogout(token) 
        .then(response => {
        //console.log(response);
          getLogout();
        })
        .catch(error => {
          console.error("Logout failed:", error);
        });
      }
    }

    const renderMenu = () => {
        const role = getRol()

        if(role=="Admin"){
            return(
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                        Menu
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/admin/user">Usuario</Dropdown.Item>
                        <Dropdown.Item href="/admin/service">Servicio</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )
        }else if(role=="Chief"){
            return(   
                <>          
                    <li className="nav-item">
                        <a className="nav-link text-white" href="/chief/notice">Noticias</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="/chief/task">Tareas</a>
                    </li>
                </>
            )
        }else if(role=="ServiceManager"){
            return(
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                       Menu
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/servicemanager/task">Tareas</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )
        }
    }

    const renderLinks = () =>{
        if(getToken()){
            return(
                <>
                <li className="nav-item">
                    <a className="nav-link text-white">{user.name}</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white" href="#" onClick={logoutUser}>
                    | Cerrar sesión
                    </a>
                </li>
                </>
            )
        }else{
            return(
                <li className="nav-item">
                    <a className="nav-link text-white" href="/login">Iniciar sesión</a>
                </li>
            )
        }
    }
    
    return(
        <nav className="navbar navbar-expand-lg shadow-sm">
                <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active text-white" aria-current="page" href="/">Inicio</a>
                    </li>
                    <ul className="navbar-nav">
                        {renderMenu()}
                    </ul>
                </ul>
                <ul className="navbar-nav ms-auto">
                {renderLinks()}
                </ul>
                </div>
        </nav>
    )
}

export default Navbar;