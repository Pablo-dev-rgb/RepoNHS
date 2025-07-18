import React, { use, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import AuthUser from "../pageAuth/AuthUser";
import { data, Link, useNavigate } from "react-router-dom";
import Config from "../Config";
import { Dropdown } from 'react-bootstrap';
import PaginatorNotice from "../components/PaginatorNotice";
import axios from "axios";
import ModalDeleteNotice from "../components/Modals/ModalDeleteNotice";

const NoticeAll = () => {

    const {getToken} = AuthUser();
    const {getRol} = AuthUser();
    const [notices, setNotices] = useState([])
    const initialFetchUrl = "http://127.0.0.1:8000/api/v1/chief/notice";
    const [currentFullUrl, setCurrentFullUrl] = useState(initialFetchUrl);
    const [paginationMeta, setPaginationMeta] = useState(null);

    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [noticeIdToDelete, setNoticeIdToDelete] = useState(null); 
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

    const handleOpenDetailModal = (noticeId) => {
        setNoticeIdToDelete(noticeId);
        setShowDeleteConfirmModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteConfirmModal(false);
        setNoticeIdToDelete(null);
    };


    const submitDelete = async (id) => {
        const token = getToken();
        try {
            await Config.noticeDelete(token, id);
            fetchNotices(currentFullUrl);
            handleCloseDeleteModal();
        } catch (error) {
            console.error("Error al borrar la noticia:", error);
        }
    }

    return (
        <div className="container">
                    <div className="row mt-5 mb-5 justify-content-center">
                        <div className="col-md-10 mt-3 mb-3">
                            <h1 className="text-center text-white">Lista de noticias</h1>
                            <Link to={`create`} className="btn text-white btnblue">Crear notice</Link>
                            <div className="mt-3 mb-3" style={{width: 'auto'}}>
                                <div className="row justify-content-center">
                                    {
                                        notices.map((notice)=>{
                                            return(
                                                <div className="d-flex" key={notice.id}>
                                                    <div className="mt-3 mb-3 w-100">
                                                        <div className="noticeCard card-body d-flex flex-wrap">
                                                            <div className="col-md-4">
                                                                <img src={"/img/notice/" + notice.urlfoto} 
                                                                className="d-block mx-auto img-fluid w-100 imgNotice" />
                                                            </div>
                                                            <div className="textNotice col-md-8 text-white d-flex flex-column">
                                                                <div className="mb-3 d-flex justify-content-between align-items-baseline">
                                                                    <h3 className="card-title mt-4" style={{maxWidth: '460px'}}>{notice.title}</h3>
                                                                    <p className="card-time mt-auto">{new Date(notice.created_at).toLocaleDateString()}</p>
                                                                </div>
                                                                <div className="d-flex justify-content-between align-items-center mt-3">
                                                                    <p className="card-text description-notice">{notice.description}</p>                                                            
                                                                    <Dropdown>
                                                                        <Dropdown.Toggle className="btn btnblue" id={`dropdown-basic-${notice.id}`}>
                                                                            Opciones
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu>
                                                                            <Dropdown.Item as={Link} to={`edit/${notice.id}`}>Editar</Dropdown.Item>
                                                                            <Dropdown.Item  className='text-danger' onClick={()=>{handleOpenDetailModal(notice.id)}}>Eliminar</Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </div>
                                                            </div>
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
                    <ModalDeleteNotice
                        show={showDeleteConfirmModal}
                        onHide={handleCloseDeleteModal}
                        noticeId={noticeIdToDelete} // Pasa el ID de la noticia a eliminar
                        onConfirm={submitDelete} // Pasa la función que se ejecutará al confirmar
                    />
        </div>
    )
}

export default NoticeAll