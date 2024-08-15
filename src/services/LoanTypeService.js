import { axiosInstance } from "../configs/axios";
import useCoockies from "../hooks/useCoockies";

const BASE_URL = import.meta.env.VITE_BE_API_URL;

const [token, setToken, removeToken] = useCoockies('token');

const header = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token()}`
};


export const getLoanTypes = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/loan-types`, {
            headers: header
        });

        if (response.status !== 200) {
            return Promise.reject(response);
        }

        console.log('action', response.data);
        return response.data;

    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export const updateLoanType = async (data) => {
    console.log('data', data);
    
    try {
        const response = await axiosInstance.put(`${BASE_URL}/loan-types/`, data, {
            headers: header
        });

        console.log('action update loan', response);

        if (response.status !== 200) {
            return Promise.reject(response);
        }

        return response.data;

    }

    catch (error) {
        console.error('error', error);
        return Promise.reject(error);
    }
};