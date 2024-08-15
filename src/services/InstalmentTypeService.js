import { axiosInstance } from "../configs/axios";
import useCoockies from "../hooks/useCoockies";

const BASE_URL = import.meta.env.VITE_BE_API_URL;

const [token, setToken, removeToken] = useCoockies('token');

const header = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token()}`
};

export const fetchInstalmentTypes = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/instalment-types`, {
            headers: header
        });

        if (response.status !== 200) {
            return Promise.reject(response);
        }

        return response.data;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export const getInstalmentTypeById = async (id) => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/instalment-types/${id}`, {
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
};

export const updateInstalmentType = async (data) => {
    try {
        const response = await axiosInstance.put(`${BASE_URL}/instalment-types`, data, {
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
};

export const deleteInstalmentType = async (id) => {
    try {
        const response = await axiosInstance.delete(`${BASE_URL}/instalment-types/${id}`, {
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
};