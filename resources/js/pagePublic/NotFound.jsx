import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return(
        <div className="container bg-light mt-5 d-flex flex-column justify-content-center align-items-center">
            <div class="row mt-5 mb-3 justify-content-center">
                <div class="col-md-8 mt-3 mb-3">
                    <div class="h-100 mt-3 mb-3 text-center">
                        <h1 className="text-danger">UPS! ...NotFound</h1>
                        <h4 className="text-center mt-3">La dirreccion a la que accedio no se encuentra disponible...</h4>
                        <Link to={"/"} className="mt-5 btn btn-secondary rounded-pill pe-5 ps-5">Volver Inicio</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound