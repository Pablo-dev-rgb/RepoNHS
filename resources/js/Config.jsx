import axios from "axios";

const base_api_url = "http://127.0.0.1:8000/api/v1";

//Routes
export default {
  //PUBLIC
    getLogin:(data)=>axios.post(`${base_api_url}/auth/login`, data),
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
      getServicesAll2:(token)=>axios.get(`${base_api_url}/admin/service`,
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
      getUserById:(token, id)=>axios.get(`${base_api_url}/admin/user/${id}`,{
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
}