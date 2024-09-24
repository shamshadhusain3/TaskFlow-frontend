import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage';
import Dashboard from './components/profile/Profile';
import { AdminDashboard } from './components/adminDashboard/AdminDashboard';
import Login from './components/forms/user/login/Login';
import Signup from './components/forms/user/signup/Signup';
import OAuth2RedirectHandler from './components/oauth2/OAuth2RedirectHandler';
import NotFound from './common/NotFound';
import { getCurrentUser } from './util/APIUtils';
import PrivateRoute from './common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import Profile from './components/profile/Profile';


function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated by fetching the current user
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <main className='md:mx-11 xl:mx-40'>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/profile" element={<Profile />} />





        {/* Protected route */}
        {/* <Route 
          path="/profile" 
          element={
            <PrivateRoute authenticated={authenticated}>
              <Profile />
            </PrivateRoute>
          } 
        /> */}
        {/* <Route 
          path="/admin" 
          element={
            <PrivateRoute authenticated={authenticated}>
              <AdminDashboard />
            </PrivateRoute>
          } 
        /> */}

        <Route path="/login" element={<Login authenticated={authenticated} />} />
        <Route path="/signup" element={<Signup authenticated={authenticated} />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Alert stack={{ limit: 3 }} />
    </main>
  );
}

export default App;
