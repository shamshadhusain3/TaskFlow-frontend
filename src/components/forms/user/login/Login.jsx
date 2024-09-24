import React, { useState, useEffect } from 'react';
import { GOOGLE_AUTH_URL, GITHUB_AUTH_URL, ACCESS_TOKEN } from '../../../../constants';
import { login } from '../../../../util/APIUtils';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import googleLogo from '/images/google-logo.png';
import githubLogo from '/images/github-logo.png';
import Alert from 'react-s-alert';

const Login = ({ authenticated }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.error) {
            setTimeout(() => {
                Alert.error(location.state.error, {
                    timeout: 5000,
                });
                navigate(location.pathname, { replace: true });
            }, 100);
        }
    }, [location, navigate]);

    // Redirect if user is authenticated
    useEffect(() => {
        if (authenticated) {
            navigate('/profile', { state: { from: location } });
        }
    }, [authenticated, navigate, location]);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login to TaskFlow</h1>
                <SocialLogin />
                <div className="flex items-center my-6">
                    <span className="border-t border-gray-300 flex-grow"></span>
                    <span className="px-2 text-sm text-gray-500">OR</span>
                    <span className="border-t border-gray-300 flex-grow"></span>
                </div>
                <LoginForm />
                <span className="block mt-4 text-center text-sm text-gray-600">
                    New user? <Link to="/signup" className="text-blue-600 hover:underline font-medium">Sign up!</Link>
                </span>
            </div>
        </div>
    );
};

const SocialLogin = () => (
    <div className="space-y-3">
        <a className="flex items-center justify-center border border-gray-300 py-2 rounded text-gray-600 hover:bg-gray-100 transition" href={GOOGLE_AUTH_URL}>
            <img src={googleLogo} alt="Google" className="w-5 h-5 mr-2" /> Log in with Google
        </a>
        <a className="flex items-center justify-center border border-gray-300 py-2 rounded text-gray-600 hover:bg-gray-100 transition" href={GITHUB_AUTH_URL}>
            <img src={githubLogo} alt="Github" className="w-5 h-5 mr-2" /> Log in with Github
        </a>
    </div>
);

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const loginRequest = { email, password };

        login(loginRequest)
            .then((response) => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                Alert.success("You're successfully logged in!");
                navigate('/');
            })
            .catch((error) => {
                Alert.error(
                    (error && error.message) || 'Oops! Something went wrong. Please try again!'
                );
            });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input
                    type="email"
                    name="email"
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                    value={email}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <input
                    type="password"
                    name="password"
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                    value={password}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    Login
                </button>
            </div>
        </form>
    );
};

export default Login;
