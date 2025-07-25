import React, { useEffect, useState } from "react";
import Config from "../Config";
import { Link, useNavigate } from "react-router-dom";
import AuthUser from "../pageAuth/AuthUser";

const Register = () =>{

    const {getToken} = AuthUser()
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [selectedRole, setSelectedRole] = useState('');
    const [roles, setRoles] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState('');
    const [hospitals, setHospitals] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [services, setServices] = useState([]);
    const navigate = useNavigate()
    const {getRol} = AuthUser()


    useEffect(()=>{
            const role = getRol()
    
            if(role !== "Admin"){
                navigate("/denegado")
            }
        })

    useEffect(() => {
        const token = getToken();
        const fetchData = async () => {
            try {
                const [rolesRes, hospitalsRes, servicesRes] = await Promise.all([
                    Config.getRolesAll(token),
                    Config.getHospitalsAll(token),
                    Config.getServicesAll(token), 
                ]);

                setRoles(rolesRes.data);
                if (rolesRes.data.length > 0) {
                    setSelectedRole(rolesRes.data[0].name);
                }

                setHospitals(hospitalsRes.data);
                if (hospitalsRes.data.length > 0) {
                    setSelectedHospital(hospitalsRes.data[0].id);
                }

                setServices(servicesRes.data);
                if (servicesRes.data.length > 0) {
                    setSelectedService(servicesRes.data[0].id);
                }
            } catch (err) {
                console.error('Error al cargar los roles:', err);
            }
        };
        fetchData();
    }, []);

    const submitRegistro = async(e) => {
        const token = getToken();
        e.preventDefault();

       const { data } = await Config.getRegister(token, {
            name,
            email,
            password,
            role: selectedRole,
            hospital_id: selectedHospital,
            service_id: selectedService,
        });

        if (data.success) {
            navigate("/admin");
        } else {
            console.error("Error de negocio en el registro:", data.error);
        }
    }

    return(
        <div style={{
            backgroundImage: 'url("/img/fondoLogin.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
            <div className="row justify-content-center w-100 m-0">
                <div className="col-sm-8 col-md-6 col-lg-4 d-flex justify-content-center">
                    <div className="cardLogin">
                        <div className="card-body me-4 ms-4">
                            <h1 className="text-center fw-bolder mt-3 mb-3">Registro de usuario</h1>

                            <input type="text" className="form-control mt-3" placeholder="Nombre:" value={name} 
                            onChange={(e)=>setName(e.target.value)} required/>

                            <input type="email" className="form-control mt-3" placeholder="Email:" value={email} 
                            onChange={(e)=>setEmail(e.target.value)} required/>

                            <input type="password" className="form-control mt-3" placeholder="Contraseña:" value={password} 
                            onChange={(e)=>setPassword(e.target.value)} required/>

                            <div className="mt-3">
                                <label className="mb-1">Rol: </label>
                                <select className="form-control" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} required>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.name}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-3">
                                <label className="mb-1">Hospital: </label>
                                <select className="form-control" value={selectedHospital} onChange={(e) => setSelectedHospital(Number(e.target.value))} required>
                                    {hospitals.map((hospital) => (
                                        <option key={hospital.id} value={hospital.id}>
                                            {hospital.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-3">
                                <label className="mb-1">Servicio: </label>
                                <select className="form-control" value={selectedService} onChange={(e) => setSelectedService(Number(e.target.value))} required>
                                    {services.map((service) => (
                                        <option key={service.id} value={service.id}>
                                            {service.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button onClick={submitRegistro} className="btn btnblue w-100 mt-3">Registrarse</button>
                            <Link to={-1} className="btn btn-secondary w-100 mt-3 mb-3">Volver</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;