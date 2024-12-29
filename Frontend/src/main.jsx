import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Flip, ToastContainer } from 'react-toastify'
import { UserContextProvider } from './Context/userContext.jsx'
import { ComplaintContextProvider } from './Context/complaintContext.jsx'

createRoot(document.getElementById('root')).render(


    <UserContextProvider>
        <ComplaintContextProvider>
            <App />
            <ToastContainer autoClose={3000} theme='colored' transition={Flip} />
        </ComplaintContextProvider>
    </UserContextProvider>



)
