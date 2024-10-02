import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ authenticated, children }) => {

  if (!authenticated) {
    return <Navigate to="/auth" />;
  }
  
  return children;
};

export default PrivateRoute;
