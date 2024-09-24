import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL } from '../../../../constants';
import { signup } from '../../../../util/APIUtils';
import fbLogo from '/images/fb-logo.png';
import googleLogo from '/images/google-logo.png';
import githubLogo from '/images/github-logo.png';
import Alert from 'react-s-alert';

const Signup = (props) => {
    const navigate = useNavigate();

    if (props.authenticated) {
        navigate("/", { state: { from: props.location } });
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Signup with TaskFlow</h1>
                
                <SocialSignup />

                <div className="flex items-center my-6">
                    <span className="border-t border-gray-300 flex-grow"></span>
                    <span className="px-2 text-sm text-gray-500">OR</span>
                    <span className="border-t border-gray-300 flex-grow"></span>
                </div>
                
                <SignupForm {...props} />

                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-600">Already have an account? </span>
                    <Link to="/login" className="text-blue-600 hover:underline font-medium">Login!</Link>
                </div>
            </div>
        </div>
    );
};

const SocialSignup = () => (
    <div className="space-y-3">
        <a className="flex items-center justify-center border border-gray-300 py-2 rounded text-gray-600 hover:bg-gray-100 transition" href={GOOGLE_AUTH_URL}>
            <img src={googleLogo} alt="Google" className="w-5 h-5 mr-2" /> Sign up with Google
        </a>
        <a className="flex items-center justify-center border border-gray-300 py-2 rounded text-gray-600 hover:bg-gray-100 transition" href={FACEBOOK_AUTH_URL}>
            <img src={fbLogo} alt="Facebook" className="w-5 h-5 mr-2" /> Sign up with Facebook
        </a>
        <a className="flex items-center justify-center border border-gray-300 py-2 rounded text-gray-600 hover:bg-gray-100 transition" href={GITHUB_AUTH_URL}>
            <img src={githubLogo} alt="Github" className="w-5 h-5 mr-2" /> Sign up with Github
        </a>
    </div>
);

const SignupForm = (props) => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const signUpRequest = { ...formState };

        signup(signUpRequest)
            .then(response => {
                Alert.success("You're successfully registered. Please login to continue!");
                navigate("/login");
            })
            .catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input
                    type="text"
                    name="name"
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <input
                    type="email"
                    name="email"
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                    value={formState.email}
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
                    value={formState.password}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    Sign Up
                </button>
            </div>
        </form>
    );
};

export default Signup;
