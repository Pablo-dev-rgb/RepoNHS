import React, { useEffect, useState } from "react";
import AuthUser from "../pageAuth/AuthUser";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Config from "../Config";

const NoticeCreate = () => {

    const {getRol, getToken} = AuthUser()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [urlfoto, setUrlfoto] = useState('')
    const [hospitals, setHospitals] = useState([])
    const [selectHospital, setSelectedHospital] = useState('')
    const navigate = useNavigate()

    const handleInputChange = async(e)=>{
        let files = e.target.files
        let reader = new FileReader();
        reader.readAsDataURL(files[0])
        reader.onload = (e)=>{
            setUrlfoto(e.target.result)
        }
    }

    useEffect(()=>{
        const role = getRol()
            if(role !== "Chief"){
                navigate("/denegado")
            }      
    })

    useEffect(() => {
        const token = getToken();
        const fetchData = async () => {
            try {
                const hospitalsRes = await Config.getHospitalsAll(token)
                setHospitals(hospitalsRes.data);
                if (hospitalsRes.data.length > 0) {
                    setSelectedHospital(hospitalsRes.data[0].id);
                }
                } catch (err) {
                    console.error('Error al cargar los hospitales:', err);
                }
        };
        fetchData();
    }, []);

    const submitStore = async (ev) => {
        const token = getToken()
        ev.preventDefault()
            
        await Config.noticeStore(token, {
            title ,
            description,
            urlfoto,
            hospital_id: selectHospital,
        });
        navigate("/chief/notice");
    }
    
    return(
            <div className="row justify-content-center mt-5 mb-5">
                <div className="col-sm-9 mt-3 mb-3">
                    <h1 className="text-center text-white">Crear noticia</h1>
                </div>
                <div className="col-sm-6 mt-3 mb-3">
                    <div className="card cardCreate">
                        <div className="card-header">CREAR NOTICIA</div>
                        <div className="card-body">
                            <form onSubmit={submitStore}>

                                <div className="col-sm-12">
                                    <label htmlFor="title">Titulo:</label>
                                    <input type="text" className="form-control mt-1 mb-2" value={title} onChange={(e)=>setTitle(e.target.value)} />
                                </div>

                                <div className="col-sm-12">
                                    <label htmlFor="description">Descripcion:</label>
                                    <textarea className="form-control mt-1 mb-2" value={description} onChange={(e)=>setDescription(e.target.value)} />
                                </div>
                                
                                 <div className="col-sm-12">
                                    <label htmlFor="description">Imagen:</label>
                                    <input className="form-control mt-1 mb-2" type="file" onChange={(e)=>handleInputChange(e)} />
                                </div>

                                <div className="col-sm-12">
                                    <label>Hospital:</label>
                                    <select className="form-control mt-1 mb-2" value={selectHospital} onChange={(e) => setSelectedHospital(Number(e.target.value))} required>
                                        {hospitals.map((hospital) => (
                                            <option key={hospital.id} value={hospital.id}>
                                                {hospital.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className="mt-3 d-flex justify-content-end">
                                    <Link to={-1} className="btn btn-secondary me-3">Volver</Link>
                                    <button type="submit" className="btn btnblue">Crear</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default NoticeCreate