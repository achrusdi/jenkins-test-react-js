import { createContext, useContext, useEffect, useState } from "react";
import fakeAuthApi from "../services/fakeAuthApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    // state:
    // - error
    // - loading
    // - user
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const login = async (username, password) => {

        // login success save data user di local storage + set state + set state loading false
        // login pending set state loading true
        // login error set state error + set state loading false

        setLoading(true);

        try {
            const userData = await fakeAuthApi.login(username, password);
            console.log('userData', userData);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        console.log('user', user);
        console.log('error', error);


    }

    const logout = async () => {
        setLoading(true);
        try {
            await fakeAuthApi.logout();
            localStorage.removeItem('user');
            setUser(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


    return (
        <AuthContext.Provider value={{ user, error, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    // return useContext(AuthContext);
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}