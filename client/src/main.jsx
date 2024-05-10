import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth.jsx';
import { SearchProvider } from './context/search.jsx';
import { CartProvider } from './context/Cart.jsx';
import { PopProvider } from './context/popup.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
      <PopProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
    </PopProvider>
    </CartProvider>
    </SearchProvider>
  </AuthProvider>
);
