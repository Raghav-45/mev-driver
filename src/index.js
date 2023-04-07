import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthContextProvider from './contexts/AuthContext'
import AppRouter from './components/AppRouter'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      {/* <App /> */}
      <AppRouter />
    </AuthContextProvider>
  </React.StrictMode>
);