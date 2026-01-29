import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import { AuthProvider } from './components/context/AuthContext.js'
import { AuthProvider } from "./components/context/AuthContext.jsx"
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    // <App />
    <AuthProvider>
    <App />
  </AuthProvider>
 // </StrictMode> 
)
