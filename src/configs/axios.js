import axios from "axios";

export const  axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    // timeout: 10000
})  