import React, { use, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import AuthUser from "../pageAuth/AuthUser";
import { data, Link, useNavigate } from "react-router-dom";
import Config from "../Config";
import { Dropdown } from 'react-bootstrap';
import PaginatorNotice from "../components/PaginatorNotice";
import axios from "axios";

const NoticeAll = () => {

    const {getToken} = AuthUser();
    const {getRol} = AuthUser();
    const [notices, setNotices] = useState([])
    const initialFetchUrl = "http://127.0.0.1:8000/api/v1/chief/notice";
    const [currentFullUrl, setCurrentFullUrl] = useState(initialFetchUrl);
    const [paginationMeta, setPaginationMeta] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
         const role = getRol()

        if(role !== "Chief"){
            navigate("/denegado")
        }
    })

    useEffect(()=>{
        fetchNotices(currentFullUrl)
    },[currentFullUrl])
    
    const fetchNotices = async (url) => {
        const token = getToken()
        try {
            let response;
            if (url === initialFetchUrl) {
                // Para la pagina inicial
                response = await Config.getNoticeAll(token);
            } else {
                // Para los cambios de pagina subsiguientes
                response = await axios.get(url,
                    {
                        headers: {
                        Authorization: `Bearer ${token}`, 
                        },
                    }
                );
            }

            const data = response.data;

            setNotices(data.data); // La lista real de avisos está en 'data.data'
            setPaginationMeta({
                current_page: data.current_page,
                last_page: data.last_page,
                next_page_url: data.next_page_url,
                prev_page_url: data.prev_page_url,
                links: data.links // Almacena los enlaces para los botones de paginación
            });
        } catch (err) {
            console.error("Error al obtener los avisos:", err);
        }
    }

    const handlePageChange = (fullUrl) => {
        if (fullUrl) {
            setCurrentFullUrl(fullUrl); // Actualiza la URL para activar el hook useEffect
        }
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
                    <div className="row mt-5 mb-5 justify-content-center">
                        <div className="col-md-8 mt-3 mb-3">
                            <h3 className="text-center">Lista de noticias</h3>
                            <Link to={`create`} className="btn btn-secondary">Crear notice</Link>
                            <div className="mt-3 mb-3" style={{width: 'auto'}}>
                                <div className="row justify-content-center">
                                    {
                                        notices.map((notice)=>{
                                            return(
                                                <div className="card mt-3 mb-3 border-bottom" key={notice.id}>
                                                    <div className="card-body d-flex flex-column">
                                                        <img src={"/img/notice/" +notice.urlfoto} width={200} height={200} className="d-block mx-auto mb-3" />
                                                    <div className="d-flex justify-content-between align-items-baseline">
                                                        <h5 className="card-title mb-0">{notice.title}</h5>                                                      
                                                        <p className="card-time mb-0">{new Date(notice.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                    
                                                     <div className="d-flex justify-content-between align-items-center mt-3">
                                                        <p className="card-text">{notice.description}</p>                                                            
                                                        <Dropdown>
                                                                <Dropdown.Toggle className="ms-2 mb-3 " variant="secondary" id={`dropdown-basic-${notice.id}`}>
                                                                    Opciones
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item as={Link} to={`edit/${notice.id}`}>Editar</Dropdown.Item>
                                                                    <Dropdown.Item  onClick={()=>{submitDelete(notice.id)}}>Eliminar</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            paginationMeta && (
                                <PaginatorNotice
                                    paginationMeta={paginationMeta}
                                    handlePageChange={handlePageChange}
                                />
                            )
                        }
                    </div>
        </div>
    )
}

export default NoticeAll