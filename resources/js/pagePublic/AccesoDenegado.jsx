import React from "react";
import { Link } from "react-router-dom";

const AccesoDenegado = () => {
    return (
        <div className="d-flex justify-content-center mt-5 mb-5 align-items-center">
            <div className="p-4 border border-secondary shadow text-center bg-light">
                <h1 className="text-danger">Acceso Denegado!!</h1>
                <p>No posee los permisos requeridos para acceder a esta pagina.</p>
                <Link to="/" className="btn btn-secondary">Volver al inicio</Link>
            </div>
        </div>
    )
}

export default AccesoDenegado