import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../configs/axios";

const BASE_URL = import.meta.env.VITE_BE_API_URL;

const header = {
    "Content-Type": "application/json",
};

export const signin = createAsyncThunk('auth/signin', async (data) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/auth/signin`, data, {
            headers: header
        });
        
        if (response.status !== 200) {
            return Promise.reject(response);
        }

        return response.data;
        
    } catch (error) {
        console.error('form auth actions',error);
        return Promise.reject(error);
    }
});

export const signup = createAsyncThunk('auth/signup', async (data) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/auth/signup`, data, {
            headers: header
        });
        
        if (response.status !== 200) {
            return Promise.reject(response);
        }

        return response.data;
        
    } catch (error) {
        console.error('form auth actions',error);
        return Promise.reject(error);
    }
})