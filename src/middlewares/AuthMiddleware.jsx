import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthMiddleware = () => {

    const fetchUser = async () => {
        try {
            const response = await useAuth();
            const user = response.user;

            if (!user) {
                return <Navigate to={'/sign-in'} />
            }

        } catch (err) {
            console.log(err);
        }
    }

    const { user } = useAuth();
    // const user = JSON.parse(localStorage.getItem('user'));


    return <Outlet />
}

export default AuthMiddleware;