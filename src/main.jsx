import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/header/Navbar';

// Use React 18's createRoot API
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    {/* <Navbar/> */}
    <App />
  </Router>
);

registerServiceWorker();
