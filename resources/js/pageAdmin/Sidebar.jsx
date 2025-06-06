import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="col-sm-3 pt-3 pb-3">
            <div className="list-group">
                <NavLink to={`/admin/user`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item")}>User</NavLink>
                <NavLink to={`/admin/categoria`}className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item")}>Hospital</NavLink>
                <NavLink to={`/admin/empresa`}className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item")}>Service</NavLink>
            </div>
        </div>
    )
}

export default Sidebar;