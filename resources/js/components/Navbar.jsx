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
          console.log(response);
          getLogout();
        })
        .catch(error => {
          console.error("Logout failed:", error);
          // Handle logout error (e.g., display a message to the user)
        });
      }
    }

    const renderMenu = () => {
        const role = getRol()
        console.log(role)

        if(role=="Admin"){
            return(
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
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
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                       Menu
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/chief/notice">Noticias</Dropdown.Item>
                        <Dropdown.Item href="/chief/task">Tareas</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )
        }else if(role=="ServiceManager"){
            return(
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                       Menu
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/servicemanager/user">Usuarios</Dropdown.Item>
                        <Dropdown.Item href="/servicemanager/task">Tareas</Dropdown.Item>
                        <Dropdown.Item href="/servicemanager/service">Servicios</Dropdown.Item>
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
                    <a className="nav-link text-white" href="#" onClick={logoutUser}>Logout</a>
                </li>
                </>
            )
        }else{
            return(
                <li className="nav-item">
                    <a className="nav-link text-white" href="/login">Login</a>
                </li>
            )
        }
    }
    
    return(
        <nav className="navbar navbar-expand-lg bg-secondary shadow-sm">
            <div className="container">
                <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <a className="nav-link active text-white" aria-current="page" href="/">Home</a>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link text-white" href= >Administracion</a>
                    </li> */}
                    <li className="nav-item">
                        {renderMenu()}
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