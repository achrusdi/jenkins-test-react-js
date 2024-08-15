import { createAsyncThunk } from "@reduxjs/toolkit";
import useCoockies from "../hooks/useCoockies";
import { axiosInstance } from "../configs/axios";

const BASE_URL = import.meta.env.VITE_BE_API_URL;

const [token, setToken, removeToken] = useCoockies('token');

const header = {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${token()}`,
};

export const getCustomers = createAsyncThunk('customers/getCustomers', async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/customers`, {
            headers: header
        });

        console.log('Customer Actions', response);

        if (response.status !== 200) {
            return Promise.reject(response);
        }

        return response.data;
    } catch (error) {
        console.log('error', error);

        return Promise.reject(error);
    }
});

export const updateCustomer = createAsyncThunk('customers/updateCustomer', async (data) => {
    try {
        const response = await axiosInstance.put(`${BASE_URL}/customers`, data, {
            headers: header
        });

        console.log('Customer Actions', response);

        if (response.status !== 200) {
            return Promise.reject(response);
        }

        return response.data;

    } catch (error) {
        console.error('form customer actions', error);
        return Promise.reject(error);
    }
});

export const deleteCustomer = createAsyncThunk('customers/deleteCustomer', async (id) => {
    try {
        const response = await axiosInstance.delete(`${BASE_URL}/customers/${id}`, {
            headers: header
        });

        if (response.status !== 200) {
            return Promise.reject(response);
        }

        return response.data;

    } catch (error) {
        console.error('form customer actions', error);
        return Promise.reject(error);
    }
})

export const uploadAvatar = createAsyncThunk('customers/uploadAvatar', async (data) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/customers/${data.customerId}/upload/avatar`, {
            avatar: data.avatar
        }, {
            headers: {
                ...header,
                'Content-Type': 'multipart/form-data'
            },
        });

        console.log('Customer Actions', response);

        if (response.status !== 200) {
            return Promise.reject(response);
        }

        return response.data;
    } catch (error) {
        console.error('form customer actions', error);
        return Promise.reject(error);
    }
});