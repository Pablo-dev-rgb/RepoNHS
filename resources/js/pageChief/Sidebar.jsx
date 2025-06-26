import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';

const Sidebar = () => {
    // const [isOpen, setIsOpen] = useState(false)

    // const  toggleDropdown = () => {
    //     setIsOpen(!isOpen);
    // };

    return (
         <Dropdown className="col-sm-2">
            <Dropdown.Toggle className="mt-3 mb-3" variant="secondary" id="dropdown-basic">
                Opciones
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="/chief/notice">Noticias</Dropdown.Item>
                <Dropdown.Item href="/chief/task">Tareas</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
            // <div className="col-sm-3 pt-3 pb-3">
        //     <div className="list-group">
        //         <NavLink to={`/chief/notice`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item")}>Noticias</NavLink>
        //         <NavLink to={`/chief/task`}className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item")}>Tareas</NavLink>
        //         {/* <NavLink to={`/admin/hospital`}className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item")}>Hospital</NavLink> */}
        //     </div>
        // </div>
    )
}

export default Sidebar;