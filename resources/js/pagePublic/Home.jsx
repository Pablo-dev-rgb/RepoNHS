import React, { useEffect, useState } from "react";
import Config from "../Config";
import axios from "axios";
import PaginatorNotice from "../components/PaginatorNotice";

const Home = () => {

    const [notices, setNotices] = useState([])
    const initialFetchUrl = "http://127.0.0.1:8000/api/v1/public/notices";
    const [currentFullUrl, setCurrentFullUrl] = useState(initialFetchUrl);
    const [paginationMeta, setPaginationMeta] = useState(null);

    useEffect(()=>{
        fetchNotices(currentFullUrl)
    },[currentFullUrl])
    
    const fetchNotices = async (url) => {
        try {
            let response;
            if (url === initialFetchUrl) {
                // Para la pagina inicial
                response = await Config.getNoticeAllPublic();
            } else {
                // Para los cambios de pagina subsiguientes
                response = await axios.get(url);
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

    const search = async (e)=>{
        const response = await Config.searchNotices({text:e})
        setNotices(response.data)
    }

    return(
        <div className="container">
            <div className="row mt-5 mb-3 justify-content-center">
                <div className="col-md-8 mt-3 mb-3">
                    <h1 className="text-center text-white">Noticias</h1>
                    <div className="row justify-content-center">
                        <div className="col-sm-6">
                            <div className="card-body d-flex flex-column">
                                <input type="search" placeholder="Buscador" 
                                onChange={(e)=>search(e.target.value)} className="form-control rounded-pill" 
                                />
                            </div>
                        </div>
                    </div>
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
                                                    <h5 className="card-title mb-0">{notice.title}</h5>
                                                    <p className="card-time mb-0">{new Date(notice.created_at).toLocaleDateString()}</p>
                                                </div>
                                                <p className="card-text description-notice mt-auto">{notice.description}</p>
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
    )
}

export default Home;