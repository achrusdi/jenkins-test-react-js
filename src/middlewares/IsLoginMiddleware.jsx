import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const IsLoginMiddleware = () => {
    const { token } = useSelector(state => state.auth);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (token) {
            navigate(location.state?.from?.pathname || '/home');
        }
    }, [location, navigate, token]);

    return <Outlet />;
}

export default IsLoginMiddleware;