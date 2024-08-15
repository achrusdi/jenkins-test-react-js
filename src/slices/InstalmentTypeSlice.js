import { createSlice } from "@reduxjs/toolkit";
import { fetchInstalmentTypes, getInstalmentTypeById } from "../actions/InstalmentTypeActions";

const InstalmentTypeSlice = createSlice({
    name: "instalmentType",
    initialState: {
        instalmentTypes: [],
        instalmentTypesHeader: [
            {name: "#", uid: "no"},
            {name: "INSTALMENT TYPE", uid: "instalmentType"},
            {name: "ACTIONS", uid: "actions"},
        ],
        selectedInstalmentType: null,
        loading: false,
        error: null,
        success: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInstalmentTypes.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(fetchInstalmentTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.instalmentTypes = action.payload.data;
                state.error = null;
                state.success = true;
            })
            .addCase(fetchInstalmentTypes.rejected, (state, action) => {
                state.loading = false;
                state.instalmentTypes = [];
                state.error = action.error.message;
                state.success = false;
            })
            .addCase(getInstalmentTypeById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(getInstalmentTypeById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedInstalmentType = action.payload.data;
                state.error = null;
                state.success = true;
            })
            .addCase(getInstalmentTypeById.rejected, (state, action) => {
                state.loading = false;
                state.selectedInstalmentType = null;
                state.error = action.error.message;
                state.success = false;
            })
    }
});

export default InstalmentTypeSlice.reducer;