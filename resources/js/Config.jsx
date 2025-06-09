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
      getRegister:(token, data)=>axios.post(`${base_api_url}/admin/register`, data,
        {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }),
      //HAY QUE VER LA FORMA DE TRAER LOS HOSPITALES DE LA BASE DE DATO
      // getHospitalAll:(token)=>axios.get(`${base_api_url}/`,
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // }),
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