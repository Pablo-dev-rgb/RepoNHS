import axios from "axios";
import { data } from "react-router-dom";

const base_api_url = "http://127.0.0.1:8000/api/v1";

//Routes
export default {
  //PUBLIC
    getLogin:(data)=>axios.post(`${base_api_url}/auth/login`, data),
    getNoticeAllPublic:()=>axios.get(`${base_api_url}/public/notices`),
    searchNotices:(data)=>axios.post(`${base_api_url}/public/notice/search`, data),
    noticeDetailsById:(id)=>axios.get(`${base_api_url}/public/notice/${id}`),
  //PRIVATE
    getLogout:(token) =>axios.post(`${base_api_url}/auth/logout`,{},
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      ),
  //ADMIN
      getRolesAll:(token)=>axios.get(`${base_api_url}/admin/roles`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
      getHospitalsAll:(token)=>axios.get(`${base_api_url}/admin/hospitals`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
      getServicesAll:(token)=>axios.get(`${base_api_url}/admin/services`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
      getRegister:(token, data)=>axios.post(`${base_api_url}/admin/register`, data,
        {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }),
      getUserAll:(token) =>axios.get(`${base_api_url}/admin/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      ),
      getUserById:(token, id)=>axios.get(`${base_api_url}/admin/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      ),
    getUserUpdate:(token, data, id) =>axios.put(`${base_api_url}/admin/user/${id}`,data,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    ),
    getServicesAll2:(token)=>axios.get(`${base_api_url}/admin/service`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ),
    getServiceById:(token, id)=>axios.get(`${base_api_url}/admin/service/${id}`,
      {
        headers: {
           Authorization: `Bearer ${token}`, 
        },
      }
    ),
    getServiceUpdate:(token, data, id) =>axios.put(`${base_api_url}/admin/service/${id}`,data,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    ),
    getServiceStore:(token, data) =>axios.post(`${base_api_url}/admin/service`,data,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    ),
  //CHIEF
    getServices:(token)=>axios.get(`${base_api_url}/chief/services`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    ),
    getNoticeAll:(token)=>axios.get(`${base_api_url}/chief/notice`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    ),
    noticeStore:(token, data)=>axios.post(`${base_api_url}/chief/notice`,data,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    ),
    noticeDelete:(token, id)=>axios.delete(`${base_api_url}/chief/notice/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    ),
    getNoticeById:(token, id)=>axios.get(`${base_api_url}/chief/notice/${id}`,
      {
        headers: {
           Authorization: `Bearer ${token}`, 
        },
      }
    ),
    noticeUpdate:(token, id, data)=>axios.put(`${base_api_url}/chief/notice/${id}`,data,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    ),
    getTaskAll:(token)=>axios.get(`${base_api_url}/chief/task`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    ),
    taskDelete:(token, id)=>axios.delete(`${base_api_url}/chief/task/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    ),
    taskUpdate:(token, id, data)=>axios.put(`${base_api_url}/chief/task/${id}`,data,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    ),
    getTaskById:(token, id)=>axios.get(`${base_api_url}/chief/task/${id}`,
      {
        headers: {
           Authorization: `Bearer ${token}`, 
        },
      }
    ),
    taskStore:(token, data)=>axios.post(`${base_api_url}/chief/task`,data,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    ),
  //SERVICEMANAGER
    getTaskAllByService:(token)=>axios.get(`${base_api_url}/servicemanager/my-task`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    ),
    updateTaskCompletion: (taskId, newCompletedStatus, token) => axios.put(`${base_api_url}/servicemanager/task/${taskId}/toggle-completion`,{ completed: newCompletedStatus },
        {
          headers: {
             Authorization: `Bearer ${token}`,
          }
        }
    ),
}