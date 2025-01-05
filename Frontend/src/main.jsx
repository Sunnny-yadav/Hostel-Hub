import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Flip, ToastContainer } from 'react-toastify'
import { UserContextProvider } from './Context/userContext.jsx'
import { ComplaintContextProvider } from './Context/complaintContext.jsx'
import { WardenComplaintContextProvider } from './Context/WardenComplaintContext.jsx'

createRoot(document.getElementById('root')).render(


    <UserContextProvider>
        <ComplaintContextProvider>
            <WardenComplaintContextProvider>
                <App />
                <ToastContainer autoClose={3000} theme='colored' transition={Flip} />
            </WardenComplaintContextProvider>
        </ComplaintContextProvider>
    </UserContextProvider>



)
