import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import ThemeSwitcher from "../ThemeSwitcher";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../slices/AuthSlice";
import useCoockies from "../../hooks/useCoockies";

const Header = () => {
    const { token, loading } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [roles] = useCoockies('roles');

    const handleSignout = async () => {
        try {
            dispatch(signout());
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Navbar>
            <NavbarBrand>
                <p className="font-bold text-inherit">LOAN APP</p>
            </NavbarBrand>
            <NavbarContent className="sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
                        Home
                    </Link>
                </NavbarItem>
                {roles() && roles().includes('admin') && (
                    <NavbarItem>
                        <Link color="foreground" onClick={() => navigate('/customers')} style={{ cursor: 'pointer' }}>
                            Customers
                        </Link>
                    </NavbarItem>
                )}

                {roles() && (roles().includes('admin') || roles().includes('staff')) && (
                    <NavbarItem>
                        <Link color="foreground" onClick={() => navigate('/instalment-type')} style={{ cursor: 'pointer' }}>
                            Instalment Type
                        </Link>
                    </NavbarItem>
                )}

                {roles() && (roles().includes('admin') || roles().includes('staff')) && (
                    <NavbarItem>
                        <Link color="foreground" onClick={() => navigate('/loan-type')} style={{ cursor: 'pointer' }}>
                            Loan Type
                        </Link>
                    </NavbarItem>
                )}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
                <NavbarItem>
                    {token ? (
                        <Button as={Link} color="danger" href="#" variant="flat" onClick={handleSignout}>
                            {loading ? 'Signing out...' : 'Sign Out'}
                        </Button>
                    ) : (
                        <Button as={Link} color="primary" href="#" variant="flat" onClick={() => navigate('/sign-in')}>
                            Sign In
                        </Button>

                    )}
                </NavbarItem>
            </NavbarContent>
        </Navbar >
    );
}

export default Header;