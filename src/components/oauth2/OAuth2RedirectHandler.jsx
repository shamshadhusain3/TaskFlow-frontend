import React from 'react';
import { ACCESS_TOKEN } from '../../constants/index';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const token = getUrlParameter('token');
    const error = getUrlParameter('error');

    if (token) {
        localStorage.setItem(ACCESS_TOKEN, token);
        navigate("/profile", { state: { from: location } });
    } else {
        navigate("/login", { state: { from: location, error: error } });
    }

    return null; // Return null since there is no need to render anything
}

export default OAuth2RedirectHandler;
