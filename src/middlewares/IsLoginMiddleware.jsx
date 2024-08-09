import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const IsLoginMiddleware = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user) {
            navigate(location.state?.from?.pathname || '/home');            
        }
    }, [location, navigate, user]);

    return <Outlet />;
}
 
export default IsLoginMiddleware;