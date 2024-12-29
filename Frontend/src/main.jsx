import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Flip, ToastContainer } from 'react-toastify'
import { UserContextProvider } from './Context/userContext.jsx'
import { complaintContextProvider } from './Context/complaintContext.jsx'


createRoot(document.getElementById('root')).render(
    <complaintContextProvider>
        <UserContextProvider>
            <App />
            <ToastContainer autoClose={3000} theme='colored' transition={Flip} />
        </UserContextProvider>
    </complaintContextProvider>


)
