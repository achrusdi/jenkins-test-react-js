import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthMiddleware = () => {
    const { user} = useAuth();
    // const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        return <Navigate to={'/sign-in'} />
    }

    return <Outlet />
}

export default AuthMiddleware;