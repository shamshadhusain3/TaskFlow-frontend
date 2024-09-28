import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../util/APIUtils'; 
import { ACCESS_TOKEN } from '../constants'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // To check if the authentication check is in progress

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const user = localStorage.getItem('user');
                if (user) {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                }
            } catch (error) {
                setAuthenticated(false);
            } finally {
                setLoading(false); // Mark authentication check as complete
            }
        };

        checkAuthentication();
    }, []);

    const login = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setAuthenticated(true); // Set authentication to true
    };

    const logout = () => {
        localStorage.removeItem('user');
        setAuthenticated(false); // Log out and set authenticated to false
    };

    return (
        <AuthContext.Provider value={{ authenticated, login, logout, setAuthenticated }}>
            {!loading && children} {/* Don't render children until loading is done */}
        </AuthContext.Provider>
    );
};
