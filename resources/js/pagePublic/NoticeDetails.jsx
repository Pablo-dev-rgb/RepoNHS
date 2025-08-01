import React, { useEffect, useState } from "react";
import Config from "../Config";
import { createPath, data, useParams } from "react-router-dom";

const NoticeDetails = () => {

    const {id} = useParams();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [created_at, setCreated_at] = useState('')
    const [urlfoto, setUrlfoto] = useState("foto.jpg")

    useEffect(()=>{         
        const getNoticeById = async ()=>{
            await Config.noticeDetailsById(id)
                .then(({data})=>{
                setTitle(data.title || '')
                setDescription(data.description || '')
                setCreated_at(data.created_at || '')
                setUrlfoto(data.urlfoto || '')
                })
        };
        getNoticeById();
    },[id])
    
    return(
        <div className="row m-5 justify-content-center">
            <div className="col-md-8 mt-3 mb-3">
                <div className="text-white border-bottom border-top" style={{borderBottomColor: '#9f9f9f', borderTopColor: '#9f9f9f'}}>
                    <div className="d-flex justify-content-between align-items-baseline mt-4 mb-4">
                    <h1 style={{maxWidth: '800px', color: '#30A1E5'}}>{title}</h1>
                    <p className="card-time mb-auto">{new Date(created_at).toLocaleDateString()}</p> 
                    </div>
                    <div style=
                    {{
                        width: '100%',
                        height: '400px',
                        marginBottom: '20px'
                    }
                    }
                    >
                        <img src={"/img/notice/" + urlfoto}
                        className="d-block mx-auto img-fluid w-100 imgNotice" />
                        </div>
                        <p className="mt-3 mb-3" style={{fontSize: '15px'}}>{description}</p>      
                </div>
            </div>
        </div>
    )
} 

export default NoticeDetails