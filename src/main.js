import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import MyProvider from './context/MyProvider.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MyProvider>
  </React.StrictMode>
);
