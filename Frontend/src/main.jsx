import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserContextProvider } from './ContextApi/userContext.jsx'

createRoot(document.getElementById('root')).render(
    <UserContextProvider>
        <App />
    </UserContextProvider>


)
