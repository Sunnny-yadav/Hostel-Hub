import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserContextProvider } from './Context/userContext.jsx'
import {Bounce, Flip, Slide, ToastContainer} from 'react-toastify'

createRoot(document.getElementById('root')).render(
    <UserContextProvider>
        <App />
       <ToastContainer autoClose={3000} theme='colored' transition={Flip} />
    </UserContextProvider>


)
