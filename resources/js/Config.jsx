import axios from "axios";

const base_api_url = "http://127.0.0.1:8000/api/v1";

//Routes
export default {
    getLogin:(data)=>axios.post(`${base_api_url}/auth/login`, data),
    getLogout:(token) =>axios.post(`${base_api_url}/auth/logout`,{},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      ),
}