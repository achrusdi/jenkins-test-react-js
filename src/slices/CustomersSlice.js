import { createSlice } from "@reduxjs/toolkit";
import { deleteCustomer, getCustomers, updateCustomer, uploadAvatar } from "../actions/CustomersActions";

const CustomersSlice = createSlice({
    name: "customers",
    initialState: {
        customers: [],
        customersHeader: [
            { name: "#", uid: "no" },
            { name: "FIRST NAME", uid: "firstName" },
            { name: "LAST NAME", uid: "lastName" },
            { name: "PHONE", uid: "phone" },
            { name: "STATUS", uid: "status" },
            { name: "DATE OF BIRTH", uid: "dateOfBirth" },
            { name: "ACTIONS", uid: "actions" },
        ],
        loading: false,
        error: null,
        success: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCustomers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload.data;
            })
            .addCase(getCustomers.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updateCustomer.rejected, (state) => {
                state.loading = false;
            })
            .addCase(deleteCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(deleteCustomer.rejected, (state) => {
                state.loading = false;
            })
            .addCase(uploadAvatar.pending, (state) => {
                state.loading = true;
            })
            .addCase(uploadAvatar.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(uploadAvatar.rejected, (state) => {
                state.loading = false;
            })
    },
});

export default CustomersSlice.reducer;