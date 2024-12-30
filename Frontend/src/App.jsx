import { Provider } from 'react-redux'
import './App.css'
import TermsPage from './components/TermsConditionPage/TermsPage'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import { store } from './store/Store'
import Features from './components/featuresPage/Features'
import RaiseComplaint_Form from './components/Dashboards/Student/Complaint/RaiseComplaint_Form'
import Index from './components/IntroPage/Index'
import Registration from './components/User_Forms/Registration'
import Login_SignIn_Layout from './components/User_Forms/Login_SignIn_Layout'
import Login from './components/User_Forms/Login'
import StudentDashboard from './components/Dashboards/Student/StudentDashboard'
import MyComplaints from './components/Dashboards/Student/Complaint/MyComplaints'
import Meal_Poll from './components/Dashboards/Student/Meal_Poll'
import WarDash from './components/Dashboards/Warden/WarDash'
import Dashboard from './components/Dashboards/Student/Dashboard'
import MatchPartner from './components/Dashboards/Student/MatchPartner'
import EditComplaint from './components/Dashboards/Student/Complaint/EditComplaint'
import Comments from './components/Dashboards/Student/Complaint/Comments'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Index />} />
      <Route path="/features" element={<Features />} />
      <Route path="/features/TermsPage" element={<TermsPage />} />
      <Route path='/warden-dashboard' element={<WarDash />} />
      <Route path='/Login_SignIn' element={<Login_SignIn_Layout />}>
        <Route path='/Login_SignIn/' element={<Registration />} />
        <Route path='/Login_SignIn/login' element={<Login />} />
      </Route>
      <Route path="/student-dashboard" element={<StudentDashboard />}>
        <Route path='/student-dashboard/' element={<Dashboard/>}/>
        <Route path='/student-dashboard/raise-complaint' element={<RaiseComplaint_Form/>}/>
        <Route path='/student-dashboard/vote' element={<Meal_Poll/>}/>
        <Route path='/student-dashboard/find-match' element={<MatchPartner/>}/>
        <Route path="/student-dashboard/review-complaints" element={<MyComplaints/>}/>
        <Route path="/student-dashboard/:complaintId/edit-complaint" element={<EditComplaint/>}/>
        <Route path="/student-dashboard/comments" element={<Comments/>}/>
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
