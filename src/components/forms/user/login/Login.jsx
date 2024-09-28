// import React, { useContext, useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { login as loginApi } from '../../../../services/UseApiService'; 
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { AuthContext } from '../../../../context/AuthContext';
// import { FaEnvelope, FaLock } from 'react-icons/fa'; // Import react-icons

// const Login = () => {
//     const { authenticated, login: loginUser,setAuthenticated } = useContext(AuthContext); 
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     if (authenticated) {
//         navigate('/profile', { state: { from: location } });
//     }

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const identifier = email;
//         const loginRequest = `identifier=${(identifier)}&password=${encodeURIComponent(password)}`;

//         try {
//             const response = await loginApi(loginRequest);
//             if (response) {
//                 loginUser(response);
//                 console.log(response.role,'role')
//                 localStorage.setItem('user', JSON.stringify(response));
//                 localStorage.getItem('user') ? setAuthenticated(true) : setAuthenticated(false);
//                 response.role === ('manager'||'company'||'team leader' )? navigate('/admin')  : navigate('/profile');
//                 toast.success("You're successfully logged in!");
//             } else {
//                 setErrorMessage('Invalid login credentials');
//                 toast.error('Invalid login credentials');
//             }
//         } catch (error) {
//             const errorMsg = (error && error.message) || 'Oops! Something went wrong. Please try again!';
//             setErrorMessage(errorMsg);
//             toast.error(errorMsg);
//         }
//     };

//     return (
//         <div className="min-h-screen flex justify-center items-center bg-gray-100">
//             <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//                 <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login to TaskFlow</h1>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

//                     {/* Email */}
//                     <div className="flex items-center border border-gray-300 p-2 rounded-md">
//                         <FaEnvelope className="text-gray-500 mr-2" />
//                         <input
//                             type="email"
//                             className="w-full outline-none"
//                             placeholder="Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>

//                     {/* Password */}
//                     <div className="flex items-center border border-gray-300 p-2 rounded-md">
//                         <FaLock className="text-gray-500 mr-2" />
//                         <input
//                             type="password"
//                             className="w-full outline-none"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
//                         Login
//                     </button>
//                 </form>

//                 <div className="mt-4 text-center">
//                     <span className="text-sm text-gray-600">Don't have an account? </span>
//                     <Link to="/signup" className="text-blue-600 hover:underline font-medium">Sign up!</Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;


import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login as loginApi } from '../../../../services/UseApiService'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../../context/AuthContext';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Import react-icons

const Login = () => {
    const { authenticated, login: loginUser, setAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (authenticated) {
            navigate('/profile', { state: { from: location } });
        }
    }, [authenticated, navigate, location]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const identifier = email;
        const loginRequest = `identifier=${encodeURIComponent(identifier)}&password=${encodeURIComponent(password)}`;

        try {
            const response = await loginApi(loginRequest);

            if (response) {
                loginUser(response);
                console.log(response.role, 'role');
                localStorage.setItem('user', JSON.stringify(response));
                setAuthenticated(true);

                const allowedRoles = ['manager', 'company', 'teamLeader'];
                if (allowedRoles.includes(response.role)) {
                    navigate('/admin');
                } else {
                    navigate('/profile');
                }

                toast.success("You're successfully logged in!");
            } else {
                // If response is empty or invalid
                setErrorMessage('Invalid login credentials');
                toast.error('Invalid login credentials');
            }
        } catch (error) {
            let errorMsg = 'Oops! Something went wrong. Please try again!';

            // Handle JSON parsing error specifically
            if (error instanceof SyntaxError) {
                errorMsg = 'Invalid response from the server. Please try again!';
            } else if (error?.response?.data?.message) {
                // Handle API error message if available
                errorMsg = error.response.data.message;
            }

            setErrorMessage(errorMsg);
            toast.error(errorMsg);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login to TaskFlow</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                    {/* Email */}
                    <div className="flex items-center border border-gray-300 p-2 rounded-md">
                        <FaEnvelope className="text-gray-500 mr-2" />
                        <input
                            type="email"
                            className="w-full outline-none"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="flex items-center border border-gray-300 p-2 rounded-md">
                        <FaLock className="text-gray-500 mr-2" />
                        <input
                            type="password"
                            className="w-full outline-none"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                        Login
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-600">Don't have an account? </span>
                    <Link to="/signup" className="text-blue-600 hover:underline font-medium">Sign up!</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
