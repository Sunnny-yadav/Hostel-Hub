import { Provider } from 'react-redux'
import './App.css'
import TermsPage from './components/TermsConditionPage/TermsPage'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import { store } from './Redux/Store'
import Features from './components/featuresPage/Features'
import RaiseComplaint_Form from './components/RaiseComplaint_Form'
import Index from './components/IntroPage/Index'
import Registration from './components/User_Forms/Registration'
import Login_SignIn_Layout from './components/User_Forms/Login_SignIn_Layout'
import Login from './components/User_Forms/Login'
import StudentDashboard from './components/Dashboards/Student/StudentDashboard'
import MyComplaints from './components/Dashboards/Student/MyComplaints'
import Meal_Poll from './components/Dashboards/Student/Meal_Poll'
import WarDash from './components/Dashboards/Warden/WarDash'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Index />} />
      <Route path="/features" element={<Features />} />
      <Route path="/features/TermsPage" element={<TermsPage />} />
      <Route path='/RaiseComplaint' element={<RaiseComplaint_Form />} />
      <Route path='/MyComplaints' element={<MyComplaints />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path='/warden-dashboard' element={<WarDash />} />
      <Route path='/Meal-Poll' element={<Meal_Poll />} />
      {/* <Route path="/Login_signIn" element={<Login_signIn />}>
        <Route path="/Login_signIn/" element={<Login />} />
        <Route path="/Login_signIn/SignIn" element={<SignIn />} />
      </Route> */}
      <Route path='/Login_SignIn' element={<Login_SignIn_Layout />}>
        <Route path='/Login_SignIn/' element={<Registration />} />
        <Route path='/Login_SignIn/login' element={<Login />} />
      </Route>

    </>
  )
)



function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
