import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import AuthContextProvider from './contexts/AuthContext'
import CustomRouter from './contexts/CustomRouter'

import { ChakraProvider } from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChakraProvider>
        <CustomRouter />
      </ChakraProvider>
    </AuthContextProvider>
  </React.StrictMode>
);