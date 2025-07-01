import React, { useEffect, useState } from "react";
import Config from "../Config";

const Home = () => {

    const [notices, setNotices] = useState([])

    useEffect(()=>{
        getNoticeAll()
    },[])
    
    const getNoticeAll = async() => {
        await Config.getNoticeAllPublic()
        .then(({data})=>{
            if(data.length > 0){
                setNotices(data)
            }
        })
    }

    return(
        <div className="container bg-light">
                    <div className="row mt-5 mb-5 justify-content-center">
                        <div className="col-md-10 mt-3 mb-3">
                            <h3 className="text-center">Noticias</h3>
                            <div className="mt-3 mb-3" style={{width: 'auto'}}>
                                <div className="card-body">
                                    {
                                        notices.map((notice)=>{
                                            return(
                                                <div className="card mt-3 mb-3 border-bottom" key={notice.id}>
                                                    <div className="card-body d-flex flex-column">
                                                    <h5 className="card-title">{notice.title}</h5>
                                                    <p className="card-text">{notice.description}</p>
                                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                                        <p className="card-time">{new Date(notice.created_at).toLocaleDateString()}</p>
                                                    </div>
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

export default Home;