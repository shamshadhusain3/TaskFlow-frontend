// import React, { useContext, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { signup as signupApi } from '../../../../services/UseApiService'; 
// import { AuthContext } from '../../../../context/AuthContext';
// import { toast } from 'react-toastify';

// import { FaUser, FaEnvelope, FaLock, FaUserTie } from 'react-icons/fa'; // Import react-icons

// const Signup = () => {
//     const { authenticated } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const [formState, setFormState] = useState({ fName: '', lName: '', email: '', password: '', role: '' });

//     if (authenticated) {
//         navigate("/");
//     }

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setFormState({ ...formState, [name]: value });
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             await signupApi(formState); 
//             toast.success("You're successfully registered. Please login to continue!");
//             navigate("/login");
//         } catch (error) {
//             toast.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
//         }
//     };

//     return (
//         <div className="min-h-screen flex justify-center items-center bg-gray-100">
//             <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//                 <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Signup with TaskFlow</h1>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     {/* First Name */}
//                     <div className="flex items-center border border-gray-300 p-2 rounded-md">
//                         <FaUser className="text-gray-500 mr-2" />
//                         <input
//                             type="text"
//                             name="fName"
//                             placeholder="First Name"
//                             value={formState.fName}
//                             onChange={handleInputChange}
//                             required
//                             className="w-full outline-none"
//                         />
//                     </div>

//                     {/* Last Name */}
//                     <div className="flex items-center border border-gray-300 p-2 rounded-md">
//                         <FaUser className="text-gray-500 mr-2" />
//                         <input
//                             type="text"
//                             name="lName"
//                             placeholder="Last Name"
//                             value={formState.lName}
//                             onChange={handleInputChange}
//                             required
//                             className="w-full outline-none"
//                         />
//                     </div>

//                     {/* Email */}
//                     <div className="flex items-center border border-gray-300 p-2 rounded-md">
//                         <FaEnvelope className="text-gray-500 mr-2" />
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             value={formState.email}
//                             onChange={handleInputChange}
//                             required
//                             className="w-full outline-none"
//                         />
//                     </div>

//                     {/* Password */}
//                     <div className="flex items-center border border-gray-300 p-2 rounded-md">
//                         <FaLock className="text-gray-500 mr-2" />
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             value={formState.password}
//                             onChange={handleInputChange}
//                             required
//                             className="w-full outline-none"
//                         />
//                     </div>

//                     {/* Role Dropdown */}
//                     <div className="flex items-center border border-gray-300 p-2 rounded-md">
//                         <FaUserTie className="text-gray-500 mr-2" />
//                         <select
//                             name="role"
//                             value={formState.role}
//                             onChange={handleInputChange}
//                             required
//                             className="w-full outline-none bg-transparent"
//                         >
//                             <option value="">Select Role</option>
//                             <option value="teamLeader">Team Leader</option>
//                             <option value="manager">Manager</option>
//                             <option value="company">Company</option>
//                         </select>
//                     </div>

//                     <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
//                         Sign Up
//                     </button>
//                 </form>
//                 <div className="mt-4 text-center">
//                     <span className="text-sm text-gray-600">Already have an account? </span>
//                     <Link to="/login" className="text-blue-600 hover:underline font-medium">Login!</Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Signup;
