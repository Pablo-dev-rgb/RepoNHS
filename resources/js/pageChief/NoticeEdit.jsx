import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import AuthUser from "../pageAuth/AuthUser";
import { Link, useNavigate, useParams } from "react-router-dom";
import Config from "../Config";

const NoticeEdit = () => {

    const {getToken, getRol} = AuthUser()
    const {id} = useParams();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [hospitals, setHospitals] = useState([])
    const [selectHospital, setSelectedHospital] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        const role = getRol()
        if(role !== "Chief"){
            navigate("/denegado")
        }      
    })

    useEffect(()=>{
            const token = getToken();
    
            const getNoticeById = async ()=>{
                await Config.getNoticeById(token, id)
                .then(({data})=>{
                    setTitle(data.title || '')
                    setDescription(data.description || '')
                })
            };
            getNoticeById();
        },[])
    
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

    const submitUpdate = async (ev) => {
        ev.preventDefault();
        
        const token = getToken();
        
        try{
            await Config.noticeUpdate(token, id,
                {
                    title,
                    description,
                    hospital_id: selectHospital,
                }
            )
            navigate("/chief/notice");
        } catch(err){
            alert("Error al actualizar servicio. Intentar nuevamente.");
        }
    }

    return (
        <div className="container bg-light">
            <div className="row justify-content-center mt-5 mb-5">
                <Sidebar/>
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-header">EDITAR NOTICIA</div>
                            <div className="card-body">
                                 <form onSubmit={submitUpdate}>

                                <div className="col-sm-12">
                                    <label htmlFor="title">Titulo:</label>
                                    <input type="text" className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)} />
                                </div>

                                <div className="col-sm-12">
                                    <label htmlFor="description">Descripcion:</label>
                                    <input type="text" className="form-control" value={description} onChange={(e)=>setDescription(e.target.value)} />
                                </div>

                                <div className="col-sm-12">
                                    <label>Hospital:</label>
                                    <select className="form-control" value={selectHospital} onChange={(e) => setSelectedHospital(Number(e.target.value))} required>
                                    {hospitals.map((hospital) => (
                                        <option key={hospital.id} value={hospital.id}>
                                            {hospital.name}
                                        </option>
                                    ))}
                                </select>
                                </div>
                                
                                <div className="btn-group mt-3">
                                    <Link to={-1} className="btn btn-secondary">Volver</Link>
                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                </div>
                            </form>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default NoticeEdit