import React, { useEffect, useState } from "react";
import Config from "../Config";
import { createPath, useParams } from "react-router-dom";
import AuthUser from "../pageAuth/AuthUser";

const NoticeDetails = () => {

    const {getToken} = AuthUser()
    const {id} = useParams();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [urlfoto, setUrlfoto] = useState("foto.jpg")

    useEffect(()=>{
        const token = getToken();
           
        const getNoticeById = async ()=>{
            await Config.getNoticeById(token, id)
                .then(({data})=>{
                setTitle(data.title || '')
                setDescription(data.description || '')
                setUrlfoto(data.urlfoto || '')
                })
        };
        getNoticeById();
    },[])
    
    return(
        <div className="row m-5 justify-content-center">
            <div className="col-md-8 mt-3 mb-3">
                <div className="text-white">
                    <div style=
                    {{
                        width: '100%',
                        height: '400px',
                        marginTop: '20px',
                        marginBottom: '20px'
                    }
                    }
                    >
                        <img src={"/img/notice/" + urlfoto}
                        className="d-block mx-auto img-fluid w-100 imgNotice" />
                        </div>
                    <h1 className="mt-3 mb-3" style={{maxWidth: '700px'}}>{title}</h1>
                    <p className="mt-3 mb-3" style={{fontSize: '20px'}}>{description}</p>
                </div>
            </div>
        </div>
    )
} 

export default NoticeDetails