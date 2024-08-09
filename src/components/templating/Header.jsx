import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import ThemeSwitcher from "../ThemeSwitcher";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();

    const handleSignout = async () => {
        try {
            await logout();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Navbar>
            <NavbarBrand>
                {/* <AcmeLogo /> */}
                <p className="font-bold text-inherit">NDOG</p>
            </NavbarBrand>
            <NavbarContent className="sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link onClick={() => navigate('/test')} style={{ cursor: 'pointer' }} aria-current="page">
                        Test
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>
                        About
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" onClick={() => navigate('/counter')} style={{ cursor: 'pointer' }}>
                        Counter
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
                <NavbarItem>
                    {user ? (
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