import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSelector } from "react-redux";

const AuthMiddleware = () => {

    const { token } = useSelector(state => state.auth);

    if (!token) {
        return <Navigate to={'/sign-in'} />
    }

    return <Outlet />
}

export default AuthMiddleware;