import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="col-sm-3 pt-3 pb-3">
            <div className="list-group">
                <NavLink to={`/admin/user`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item")}>Usuario</NavLink>
                <NavLink to={`/admin/service`}className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item")}>Servicio</NavLink>
                {/* <NavLink to={`/admin/hospital`}className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item")}>Hospital</NavLink> */}
            </div>
        </div>
    )
}

export default Sidebar;