import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return(
        <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100"> {/* Añade min-vh-100 */}
        <div className="row justify-content-center"> {/* Usa className en lugar de class */}
            <div className="col-md-8 mt-3 mb-3">
                <div className="h-100 mb-3 text-center"> {/* h-100 aquí no es estrictamente necesario, pero no molesta */}
                    <h1 className="text-white">UPS! ...NotFound</h1>
                    <h4 className="text-center text-white mt-3">La dirección a la que accedió no se encuentra disponible...</h4>
                    <Link to={"/"} className="mt-5 btn btnblue rounded-pill pe-5 ps-5">Volver Inicio</Link>
                </div>
            </div>
        </div>
    </div>
    )
}

export default NotFound