



import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import { signup as signupApi, login as loginApi } from '../services/UseApiService';
// import { AuthContext } from '../context/AuthContext';
import { signup as signupApi, login as loginApi } from '../../../../services/UseApiService';
import { AuthContext } from '../../../../context/AuthContext';
import { toast } from 'react-toastify';
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