// // App.jsx
// import React, { useContext } from "react";
// import "./App.css";
// import { Route, Routes } from "react-router-dom";
// import LandingPage from "./components/landingPage/LandingPage";
// import Dashboard from "./components/profile/Profile";
// import { AdminDashboard } from "./components/adminDashboard/AdminDashboard";
// import Login from "./components/forms/user/login/Login";
// import Signup from "./components/forms/user/signup/Signup";
// import OAuth2RedirectHandler from "./components/oauth2/OAuth2RedirectHandler";
// import NotFound from "./common/NotFound";
// import { AuthContext, AuthProvider } from "./context/AuthContext";
// import PrivateRoute from "./common/PrivateRoute";

// import Profile from "./components/profile/Profile";

// function App() {
//     const { authenticated, login: loginUser } = useContext(AuthContext); 

//   return (
//     <AuthProvider>
//       <main className="md:mx-11 xl:mx-40">
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           {/* <Route path="/admin" element={<AdminDashboard />} />
//                     <Route path="/profile" element={<Profile />} /> */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
//           <Route path="*" element={<NotFound />} />
//           {/* Protected route */}
//           <Route
//             path="/profile"
//             element={
//               <PrivateRoute authenticated={authenticated}>
//                 <Profile />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/admin"
//             element={
//               <PrivateRoute authenticated={authenticated}>
//                 <AdminDashboard />
//               </PrivateRoute>
//             }
//           />
//         </Routes>

//         <Alert stack={{ limit: 3 }} />
//       </main>
//     </AuthProvider>
//   );
// }

// export default App;



// App.jsx
import React, { useContext } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import { AdminDashboard } from "./components/adminDashboard/AdminDashboard";

// import Signup from "./components/forms/user/signup/Signup";
import OAuth2RedirectHandler from "./components/oauth2/OAuth2RedirectHandler";
import NotFound from "./common/NotFound";
import { AuthContext } from "./context/AuthContext";  // Only import AuthContext
import PrivateRoute from "./common/PrivateRoute";

import Profile from "./components/profile/Profile";
import Navbar from "./components/header/Navbar";
import AuthForm from "./components/forms/user/login/Login";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { authenticated } = useContext(AuthContext); // Access authenticated 
  const admin = JSON.parse(localStorage.getItem('user'))
  

  return (
    <main className="md:mx-11 xl:mx-40">
       {admin?.role!==('manager' || 'company'||'teamLeader')&& <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthForm />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="*" element={<NotFound />} />
        {/* Protected routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute authenticated={authenticated}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute authenticated={authenticated}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>

    
    </main>
  );
}

export default App;
