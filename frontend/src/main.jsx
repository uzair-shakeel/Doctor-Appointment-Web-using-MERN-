import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/authContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <AuthProvider>
    <ToastContainer position='top-center' autoClose={2000} closeOnClick={true} />
    <App />
    </AuthProvider>
  </BrowserRouter>
  </React.StrictMode>,
)
