import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="col-sm-3 pt-3 pb-3">
            <div className="list-group">
                <NavLink to={`/chief/notice`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item")}>Noticias</NavLink>
                <NavLink to={`/chief/task`}className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item")}>Tareas</NavLink>
                {/* <NavLink to={`/admin/hospital`}className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item")}>Hospital</NavLink> */}
            </div>
        </div>
    )
}

export default Sidebar;