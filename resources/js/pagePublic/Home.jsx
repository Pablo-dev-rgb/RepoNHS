import React, { useEffect, useState } from "react";
import Config from "../Config";
import axios from "axios";

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
        <div className="container bg-light">
                    <div className="row mt-5 mb-3 justify-content-center">
                        <div className="col-md-10 mt-3 mb-3">
                            <h3 className="text-center">Noticias</h3>
                                <div className="row justify-content-center">
                                    <div className="col-sm-6">
                                        <div className="card-body d-flex flex-column">
                                            <input type="search" placeholder="Buscador" 
                                            onChange={(e)=>search(e.target.value)} className="form-control rounded-pill" 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {
                                        notices.map((notice)=>{
                                            return(
                                                <div className="card mt-3 mb-3 border-bottom" key={notice.id}>
                                                    <div className="card-body d-flex flex-column">
                                                    <div className="mb-3 d-flex justify-content-between align-items-baseline">
                                                        <h5 className="card-title mb-0">{notice.title}</h5>
                                                        <p className="card-time mb-0">{new Date(notice.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                    <p className="card-text">{notice.description}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                        </div>
                    </div>
                    {paginationMeta && (
                        <nav>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '20px'}}>
                                {paginationMeta.links.map((link, index) => (
                                    <li key={index} style={{ margin: '0 5px' }}>
                                        <button
                                            onClick={() => handlePageChange(link.url)}
                                            disabled={!link.url}
                                            style={{
                                                fontWeight: link.active ? 'bold' : 'normal',
                                                backgroundColor: link.active ? '#e0e0e0' : 'transparent',
                                                border: '1px solid #ccc',
                                                padding: '8px 12px',
                                                cursor: link.url ? 'pointer' : 'not-allowed',
                                                borderRadius: '4px'
                                            }}
                                        >
                                            {link.label.includes('Previous') ? '«' :
                                            link.label.includes('Next') ? '»' :
                                            link.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
        </div>
    )
}

export default Home;