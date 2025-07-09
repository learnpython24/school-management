// frontend/src/contexts/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode, InvalidTokenError } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();
    
    const login = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login/', credentials);
            const { access } = response.data;
            localStorage.setItem('token', access);
            setToken(access);
            const decoded = jwtDecode(access);
            setUser(decoded);
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };
    
    const register = async (userData) => {
        try {
            await axios.post('http://localhost:8000/api/auth/register/', userData);
            return true;
        } catch (error) {
            console.error('Registration error:', error);
            return false;
        }
    };
    
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        navigate('/login');
    };
    
    useEffect(() => {
        if (token) {
            // const decoded = jwtDecode(token);
            // setUser(decoded);
            // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } catch (error) {
                if (error instanceof InvalidTokenError) {
                    console.error('Invalid token format', error.message);
                } else {
                    console.error('Unexpected error', error);
                }
            }
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);
    
    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);