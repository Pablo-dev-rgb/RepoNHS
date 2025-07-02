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

    const search = async (e)=>{
        const response = await Config.searchNotices({text:e})
        setNotices(response.data)
    }

    return(
        <div className="container bg-light">
                    <div className="row mt-5 mb-5 justify-content-center">
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
        </div>
    )
}

export default Home;