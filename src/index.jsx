import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import MyProvider from './context/MyProvider';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <MyProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MyProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
