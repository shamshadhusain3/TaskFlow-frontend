// // // import React, { useContext, useState } from 'react';
// // // import { Link, useNavigate, useLocation } from 'react-router-dom';
// // // import { login as loginApi } from '../../../../services/UseApiService'; 
// // // import { toast } from 'react-toastify';
// // // import 'react-toastify/dist/ReactToastify.css';
// // // import { AuthContext } from '../../../../context/AuthContext';
// // // import { FaEnvelope, FaLock } from 'react-icons/fa'; // Import react-icons

// // // const Login = () => {
// // //     const { authenticated, login: loginUser,setAuthenticated } = useContext(AuthContext); 
// // //     const navigate = useNavigate();
// // //     const location = useLocation();
// // //     const [email, setEmail] = useState('');
// // //     const [password, setPassword] = useState('');
// // //     const [errorMessage, setErrorMessage] = useState('');

// // //     if (authenticated) {
// // //         navigate('/profile', { state: { from: location } });
// // //     }

// // //     const handleSubmit = async (event) => {
// // //         event.preventDefault();
// // //         const identifier = email;
// // //         const loginRequest = `identifier=${(identifier)}&password=${encodeURIComponent(password)}`;

// // //         try {
// // //             const response = await loginApi(loginRequest);
// // //             if (response) {
// // //                 loginUser(response);
// // //                 console.log(response.role,'role')
// // //                 localStorage.setItem('user', JSON.stringify(response));
// // //                 localStorage.getItem('user') ? setAuthenticated(true) : setAuthenticated(false);
// // //                 response.role === ('manager'||'company'||'team leader' )? navigate('/admin')  : navigate('/profile');
// // //                 toast.success("You're successfully logged in!");
// // //             } else {
// // //                 setErrorMessage('Invalid login credentials');
// // //                 toast.error('Invalid login credentials');
// // //             }
// // //         } catch (error) {
// // //             const errorMsg = (error && error.message) || 'Oops! Something went wrong. Please try again!';
// // //             setErrorMessage(errorMsg);
// // //             toast.error(errorMsg);
// // //         }
// // //     };

// // //     return (
// // //         <div className="min-h-screen flex justify-center items-center bg-gray-100">
// // //             <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
// // //                 <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login to TaskFlow</h1>
// // //                 <form onSubmit={handleSubmit} className="space-y-4">
// // //                     {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

// // //                     {/* Email */}
// // //                     <div className="flex items-center border border-gray-300 p-2 rounded-md">
// // //                         <FaEnvelope className="text-gray-500 mr-2" />
// // //                         <input
// // //                             type="email"
// // //                             className="w-full outline-none"
// // //                             placeholder="Email"
// // //                             value={email}
// // //                             onChange={(e) => setEmail(e.target.value)}
// // //                             required
// // //                         />
// // //                     </div>

// // //                     {/* Password */}
// // //                     <div className="flex items-center border border-gray-300 p-2 rounded-md">
// // //                         <FaLock className="text-gray-500 mr-2" />
// // //                         <input
// // //                             type="password"
// // //                             className="w-full outline-none"
// // //                             placeholder="Password"
// // //                             value={password}
// // //                             onChange={(e) => setPassword(e.target.value)}
// // //                             required
// // //                         />
// // //                     </div>

// // //                     <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
// // //                         Login
// // //                     </button>
// // //                 </form>

// // //                 <div className="mt-4 text-center">
// // //                     <span className="text-sm text-gray-600">Don't have an account? </span>
// // //                     <Link to="/signup" className="text-blue-600 hover:underline font-medium">Sign up!</Link>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default Login;


// // import React, { useContext, useState, useEffect } from 'react';
// // import { Link, useNavigate, useLocation } from 'react-router-dom';
// // import { login as loginApi } from '../../../../services/UseApiService'; 
// // import { toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import { AuthContext } from '../../../../context/AuthContext';
// // import { FaEnvelope, FaLock } from 'react-icons/fa'; // Import react-icons

// // const Login = () => {
// //     const { authenticated, login: loginUser, setAuthenticated } = useContext(AuthContext);
// //     const navigate = useNavigate();
// //     const location = useLocation();
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [errorMessage, setErrorMessage] = useState('');

// //     useEffect(() => {
// //         if (authenticated) {
// //             navigate('/profile', { state: { from: location } });
// //         }
// //     }, [authenticated, navigate, location]);

// //     const handleSubmit = async (event) => {
// //         event.preventDefault();
// //         const identifier = email;
// //         const loginRequest = `identifier=${encodeURIComponent(identifier)}&password=${encodeURIComponent(password)}`;

// //         try {
// //             const response = await loginApi(loginRequest);

// //             if (response) {
// //                 loginUser(response);
// //                 console.log(response.role, 'role');
// //                 localStorage.setItem('user', JSON.stringify(response));
// //                 setAuthenticated(true);

// //                 const allowedRoles = ['manager', 'company', 'teamLeader'];
// //                 if (allowedRoles.includes(response.role)) {
// //                     navigate('/admin');
// //                 } else {
// //                     navigate('/profile');
// //                 }

// //                 toast.success("You're successfully logged in!");
// //             } else {
// //                 // If response is empty or invalid
// //                 setErrorMessage('Invalid login credentials');
// //                 toast.error('Invalid login credentials');
// //             }
// //         } catch (error) {
// //             let errorMsg = 'Oops! Something went wrong. Please try again!';

// //             // Handle JSON parsing error specifically
// //             if (error instanceof SyntaxError) {
// //                 errorMsg = 'Invalid response from the server. Please try again!';
// //             } else if (error?.response?.data?.message) {
// //                 // Handle API error message if available
// //                 errorMsg = error.response.data.message;
// //             }

// //             setErrorMessage(errorMsg);
// //             toast.error(errorMsg);
// //         }
// //     };

// //     return (
// //         <div className="min-h-screen flex justify-center items-center bg-gray-100">
// //             <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
// //                 <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login to TaskFlow</h1>
// //                 <form onSubmit={handleSubmit} className="space-y-4">
// //                     {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

// //                     {/* Email */}
// //                     <div className="flex items-center border border-gray-300 p-2 rounded-md">
// //                         <FaEnvelope className="text-gray-500 mr-2" />
// //                         <input
// //                             type="email"
// //                             className="w-full outline-none"
// //                             placeholder="Email"
// //                             value={email}
// //                             onChange={(e) => setEmail(e.target.value)}
// //                             required
// //                         />
// //                     </div>

// //                     {/* Password */}
// //                     <div className="flex items-center border border-gray-300 p-2 rounded-md">
// //                         <FaLock className="text-gray-500 mr-2" />
// //                         <input
// //                             type="password"
// //                             className="w-full outline-none"
// //                             placeholder="Password"
// //                             value={password}
// //                             onChange={(e) => setPassword(e.target.value)}
// //                             required
// //                         />
// //                     </div>

// //                     <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
// //                         Login
// //                     </button>
// //                 </form>

// //                 <div className="mt-4 text-center">
// //                     <span className="text-sm text-gray-600">Don't have an account? </span>
// //                     <Link to="/signup" className="text-blue-600 hover:underline font-medium">Sign up!</Link>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Login;









// import React, { useContext, useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { signup as signupApi, login as loginApi } from '../../../../services/UseApiService';
// import { AuthContext } from '../../../../context/AuthContext';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaUser, FaEnvelope, FaLock, FaUserTie, FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn } from 'react-icons/fa';
// import './AuthForm.css';

// const AuthForm = () => {
//   const { authenticated, login: loginUser, setAuthenticated } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [formState, setFormState] = useState({ fName: '', lName: '', email: '', password: '', role: '' });
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     if (authenticated) {
//       navigate('/profile', { state: { from: location } });
//     }
//   }, [authenticated, navigate, location]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormState(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleSignup = async (event) => {
//     event.preventDefault();
//     try {
//       await signupApi(formState);
//       toast.success("You're successfully registered. Please login to continue!");
//       setIsSignUp(false);
//     } catch (error) {
//       toast.error(error?.message || 'Oops! Something went wrong. Please try again!');
//     }
//   };

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     const loginRequest = `identifier=${encodeURIComponent(formState.email)}&password=${encodeURIComponent(formState.password)}`;

//     try {
//       const response = await loginApi(loginRequest);
//       if (response) {
//         loginUser(response);
//         setAuthenticated(true);

//         const allowedRoles = ['manager', 'company', 'teamLeader'];
//         if (allowedRoles.includes(response.role)) {
//           navigate('/admin');
//         } else {
//           navigate('/profile');
//         }

//         toast.success("You're successfully logged in!");
//       } else {
//         setErrorMessage('Invalid login credentials');
//         toast.error('Invalid login credentials');
//       }
//     } catch (error) {
//       let errorMsg = 'Oops! Something went wrong. Please try again!';
//       if (error instanceof SyntaxError) {
//         errorMsg = 'Invalid response from the server. Please try again!';
//       } else if (error?.response?.data?.message) {
//         errorMsg = error.response.data.message;
//       }
//       setErrorMessage(errorMsg);
//       toast.error(errorMsg);
//     }
//   };

//   const toggleMode = () => {
//     setIsSignUp(!isSignUp);
//     setFormState({ fName: '', lName: '', email: '', password: '', role: '' });
//     setErrorMessage('');
//   };

//   return (
//     <div className={`container ${isSignUp ? 'sign-up-mode' : ''}`}>
//       <div className="forms-container">
//         <div className="signin-signup">
//           <form onSubmit={handleLogin} className="sign-in-form">
//             <h2 className="title">Sign in</h2>
//             {errorMessage && <p className="error-message">{errorMessage}</p>}
//             <div className="input-field">
//               <i><FaUser /></i>
//               <input type="email" name="email" placeholder="Email" value={formState.email} onChange={handleInputChange} required />
//             </div>
//             <div className="input-field">
//               <i><FaLock /></i>
//               <input type="password" name="password" placeholder="Password" value={formState.password} onChange={handleInputChange} required />
//             </div>
//             <input type="submit" value="Login" className="btn solid" />
//             <p className="social-text">Or Sign in with social platforms</p>
//             <div className="social-media">
//               <a href="#" className="social-icon">
//                 <FaFacebookF />
//               </a>
//               <a href="#" className="social-icon">
//                 <FaTwitter />
//               </a>
//               <a href="#" className="social-icon">
//                 <FaGoogle />
//               </a>
//               <a href="#" className="social-icon">
//                 <FaLinkedinIn />
//               </a>
//             </div>
//           </form>
//           <form onSubmit={handleSignup} className="sign-up-form">
//             <h2 className="title">Sign up</h2>
//             <div className="input-field">
//               <i><FaUser /></i>
//               <input type="text" name="fName" placeholder="First Name" value={formState.fName} onChange={handleInputChange} required />
//             </div>
//             <div className="input-field">
//               <i><FaUser /></i>
//               <input type="text" name="lName" placeholder="Last Name" value={formState.lName} onChange={handleInputChange} required />
//             </div>
//             <div className="input-field">
//               <i><FaEnvelope /></i>
//               <input type="email" name="email" placeholder="Email" value={formState.email} onChange={handleInputChange} required />
//             </div>
//             <div className="input-field">
//               <i><FaLock /></i>
//               <input type="password" name="password" placeholder="Password" value={formState.password} onChange={handleInputChange} required />
//             </div>
//             <div className="input-field">
//               <i><FaUserTie /></i>
//               <select name="role" value={formState.role} onChange={handleInputChange} required>
//                 <option value="">Select Role</option>
//                 <option value="teamLeader">Team Leader</option>
//                 <option value="manager">Manager</option>
//                 <option value="company">Company</option>
//               </select>
//             </div>
//             <input type="submit" className="btn" value="Sign up" />
//             <p className="social-text">Or Sign up with social platforms</p>
//             <div className="social-media">
//               <a href="#" className="social-icon">
//                 <FaFacebookF />
//               </a>
//               <a href="#" className="social-icon">
//                 <FaTwitter />
//               </a>
//               <a href="#" className="social-icon">
//                 <FaGoogle />
//               </a>
//               <a href="#" className="social-icon">
//                 <FaLinkedinIn />
//               </a>
//             </div>
//           </form>
//         </div>
//       </div>

//       <div className="panels-container">
//         <div className="panel left-panel">
//           <div className="content">
//             <h3>New here ?</h3>
//             <p>
//               Join TaskFlow and start managing your projects efficiently!
//             </p>
//             <button className="btn transparent" id="sign-up-btn" onClick={toggleMode}>
//               Sign up
//             </button>
//           </div>
//           <img src="/img/log.svg" className="image" alt="" />
//         </div>
//         <div className="panel right-panel">
//           <div className="content">
//             <h3>One of us ?</h3>
//             <p>
//               Sign in to access your TaskFlow account and manage your projects!
//             </p>
//             <button className="btn transparent" id="sign-in-btn" onClick={toggleMode}>
//               Sign in
//             </button>
//           </div>
//           <img src="/img/register.svg" className="image" alt="" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;




import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import { signup as signupApi, login as loginApi } from '../services/UseApiService';
// import { AuthContext } from '../context/AuthContext';
import { signup as signupApi, login as loginApi } from '../../../../services/UseApiService';
import { AuthContext } from '../../../../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaEnvelope, FaLock, FaUserTie, FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn } from 'react-icons/fa';
import styles from './AuthForm.module.css';

const AuthForm = () => {
  const { authenticated, login: loginUser, setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formState, setFormState] = useState({ fName: '', lName: '', email: '', password: '', role: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (authenticated) {
      navigate('/profile', { state: { from: location } });
    }
  }, [authenticated, navigate, location]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await signupApi(formState);
      toast.success("You're successfully registered. Please login to continue!");
      setIsSignUp(false);
    } catch (error) {
      toast.error(error?.message || 'Oops! Something went wrong. Please try again!');
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginRequest = `identifier=${encodeURIComponent(formState.email)}&password=${encodeURIComponent(formState.password)}`;

    try {
      const response = await loginApi(loginRequest);
      if (response) {
        loginUser(response);
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
        setErrorMessage('Invalid login credentials');
        toast.error('Invalid login credentials');
      }
    } catch (error) {
      let errorMsg = 'Oops! Something went wrong. Please try again!';
      if (error instanceof SyntaxError) {
        errorMsg = 'Invalid response from the server. Please try again!';
      } else if (error?.response?.data?.message) {
        errorMsg = error.response.data.message;
      }
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setErrorMessage('');
  };

  return (
    <div className={`${styles.container} ${isSignUp ? styles.signUpMode : ''}`}>
      <div className={styles.formsContainer}>
        <div className={styles.signinSignup}>
          <form onSubmit={handleLogin} className={styles.signInForm}>
            <h2 className={styles.title}>Sign in</h2>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            <div className={styles.inputField}>
              <i><FaEnvelope /></i>
              <input type="email" name="email" placeholder="Email" value={formState.email} onChange={handleInputChange} required />
            </div>
            <div className={styles.inputField}>
              <i><FaLock /></i>
              <input type="password" name="password" placeholder="Password" value={formState.password} onChange={handleInputChange} required />
            </div>
            <input type="submit" value="Login" className={styles.btn} />
            <p className={styles.socialText}>Or Sign in with social platforms</p>
            <div className={styles.socialMedia}>
              <a href="#" className={styles.socialIcon}><FaFacebookF /></a>
              <a href="#" className={styles.socialIcon}><FaTwitter /></a>
              <a href="#" className={styles.socialIcon}><FaGoogle /></a>
              <a href="#" className={styles.socialIcon}><FaLinkedinIn /></a>
            </div>
          </form>
          <form onSubmit={handleSignup} className={styles.signUpForm}>
            <h2 className={styles.title}>Sign up</h2>
            <div className={styles.inputField}>
              <i><FaUser /></i>
              <input type="text" name="fName" placeholder="First Name" value={formState.fName} onChange={handleInputChange} required />
            </div>
            <div className={styles.inputField}>
              <i><FaUser /></i>
              <input type="text" name="lName" placeholder="Last Name" value={formState.lName} onChange={handleInputChange} required />
            </div>
            <div className={styles.inputField}>
              <i><FaEnvelope /></i>
              <input type="email" name="email" placeholder="Email" value={formState.email} onChange={handleInputChange} required />
            </div>
            <div className={styles.inputField}>
              <i><FaLock /></i>
              <input type="password" name="password" placeholder="Password" value={formState.password} onChange={handleInputChange} required />
            </div>
            <div className={styles.inputField}>
              <i><FaUserTie /></i>
              <select name="role" value={formState.role} onChange={handleInputChange} required>
                <option value="">Select Role</option>
                <option value="teamLeader">Team Leader</option>
                <option value="manager">Manager</option>
                <option value="company">Company</option>
              </select>
            </div>
            <input type="submit" className={styles.btn} value="Sign up" />
            <p className={styles.socialText}>Or Sign up with social platforms</p>
            <div className={styles.socialMedia}>
              <a href="#" className={styles.socialIcon}><FaFacebookF /></a>
              <a href="#" className={styles.socialIcon}><FaTwitter /></a>
              <a href="#" className={styles.socialIcon}><FaGoogle /></a>
              <a href="#" className={styles.socialIcon}><FaLinkedinIn /></a>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.panelsContainer}>
        <div className={`${styles.panel} ${styles.leftPanel}`}>
          <div className={styles.content}>
            <h3>New here ?</h3>
            <p>Join TaskFlow and start managing your projects efficiently!</p>
            <button className={`${styles.btn} ${styles.transparent}`} onClick={toggleMode}>
              Sign up
            </button>
          </div>
          <img src="/img/log.svg" className={styles.image} alt="" />
        </div>
        <div className={`${styles.panel} ${styles.rightPanel}`}>
          <div className={styles.content}>
            <h3>One of us ?</h3>
            <p>Sign in to access your TaskFlow account and manage your projects!</p>
            <button className={`${styles.btn} ${styles.transparent}`} onClick={toggleMode}>
              Sign in
            </button>
          </div>
          <img src="/img/register.svg" className={styles.image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;