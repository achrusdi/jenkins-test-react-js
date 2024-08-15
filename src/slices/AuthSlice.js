import { createSlice } from "@reduxjs/toolkit";
import useCoockies from "../hooks/useCoockies";
import { signin, signup } from "../actions/authActions";

const [token, setToken, removeToken] = useCoockies('token');

const [roles, setRoles, removeRoles] = useCoockies('roles');

const AuthSlice = createSlice({
    name: 'auth',
    initialState: { 
        token: token() || null,
        roles: roles() || [],
        error: null,
        loading: false,
        success: false
    },
    reducers: {
        signout: (state) => {
            state.token = null;
            state.roles = [];
            removeToken();
            removeRoles();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signin.pending, (state) => {
                state.loading = true;
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.token = action.payload.data.token;
                setToken(action.payload.data.token);
                state.roles = action.payload.data.role;
                setRoles(action.payload.data.role);
                
            })
            .addCase(signin.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(signup.pending, (state) => {
                state.loading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.success = true;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
    }
});

export const { signout } = AuthSlice.actions;
export default AuthSlice.reducer;