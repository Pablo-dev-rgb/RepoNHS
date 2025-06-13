import React, { use, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import AuthUser from "../pageAuth/AuthUser";
import { data, Link, useNavigate } from "react-router-dom";
import Config from "../Config";

const NoticeAll = () => {

    const {getToken} = AuthUser();
    const {getRol} = AuthUser();
    const [notices, setNotices] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
         const role = getRol()

        if(role !== "Chief"){
            navigate("/denegado")
        }
    })

    useEffect(()=>{
        getNoticeAll()
    },[])

    const getNoticeAll = async() => {
        const token = getToken()
        await Config.getNoticeAll(token)
        .then(({data})=>{
            if(data.length > 0){
                setNotices(data)
            }
        })
        // console.log(response)
        // setNotices(response)
    }

    const submitDelete = async (id) => {
        const token = getToken()

        const isDelete = window.confirm("¿Desea borrar la noticia?")
        if(isDelete){
            await Config.noticeDelete(token, id)
            getNoticeAll()
        }
    }

    return (
        <div className="container bg-light">
                    <div className="row mt-5 mb-5">
                        <Sidebar/>
                        <div className="col-md-7">
                            <h3 className="mt-3">Lista de noticias</h3>
                            <Link to={`create`} className="btn btn-primary">Crear notice</Link>
                            <div className="card mt-3 mb-3" style={{width: 'auto'}}>
                                <div className="card-body">
                                    {
                                        notices.map((notice)=>{
                                            return(
                                                <div className="border-bottom" key={notice.id}>
                                                    <div className="card-body">
                                                    <h5 className="card-title">{notice.title}</h5>
                                                        <p className="card-text">{notice.description}</p>
                                                        <Link to={`edit/${notice.id}`} className="btn btn-primary me-3">Editar</Link>
                                                        <button className="btn btn-danger" onClick={()=>{submitDelete(notice.id)}}>Eliminar</button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    )
}

export default NoticeAll