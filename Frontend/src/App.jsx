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
import WardenDashboard from './components/Dashboards/Warden/WardenDashboard'
import Dashboard from './components/Dashboards/Student/Dashboard'
import MatchPartner from './components/Dashboards/Student/MatchPartner'
import EditComplaint from './components/Dashboards/Student/Complaint/EditComplaint'
import WarComments from './components/Dashboards/Warden/Complaint/WarComments'
import Comments from './components/Dashboards/Student/Complaint/Comments'
import WardenStart from './components/Dashboards/Warden/WardenStart'
import ViewComplaint from './components/Dashboards/Warden/Complaint/ViewComplaint'
import ComplaintDetails from './components/Dashboards/Warden/Complaint/ComplaintDetails'
import MealForm from './components/Dashboards/Warden/MealForm'
import NoticeBoard from './components/Dashboards/Warden/NoticeBoard'
import AllStudentData from './components/Dashboards/Warden/StudentPages/AllStudentData'
import StudentDetails from './components/Dashboards/Warden/StudentPages/StudentDetails'
import OneStudentComplaint from './components/Dashboards/Warden/StudentPages/OneStudentComplaint'
import Profile from './components/ProfilePages/Profile'
import VotedOnPolls from './components/Dashboards/Warden/StudentPages/VotedOnPolls'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Index />} />
      <Route path="/features" element={<Features />} />
      <Route path="/features/TermsPage" element={<TermsPage />} />

      {/* Login routes  */}
      <Route path='/Login_SignIn' element={<Login_SignIn_Layout />}>
        <Route path='/Login_SignIn/' element={<Registration />} />
        <Route path='/Login_SignIn/login' element={<Login />} />
      </Route>

      {/* routes for student pages  */}
      <Route path="/student-dashboard" element={<StudentDashboard />}>
        <Route path='/student-dashboard/' element={<Dashboard />} />
        <Route path='/student-dashboard/raise-complaint' element={<RaiseComplaint_Form />} />
        <Route path='/student-dashboard/vote' element={<Meal_Poll />} />
        <Route path='/student-dashboard/find-match' element={<MatchPartner />} />
        <Route path="/student-dashboard/review-complaints" element={<MyComplaints />} />
        <Route path="/student-dashboard/profile" element={<Profile />} />
        <Route path="/student-dashboard/:complaintId/edit-complaint" element={<EditComplaint />} />
        <Route path="/student-dashboard/:complaintId/comments" element={<Comments />} />
      </Route>

      {/* routes for the warden page  */}
      <Route path='/warden-dashboard' element={<WardenDashboard />} >
        <Route path='' element={<WardenStart />} />
        <Route path="/warden-dashboard/profile" element={<Profile />} />
        <Route path='/warden-dashboard/view-complaints' element={<ViewComplaint />} />
        <Route path='/warden-dashboard/add-meal' element={<MealForm />} />
        <Route path='/warden-dashboard/give-notice' element={<NoticeBoard />} />
        <Route path='/warden-dashboard/get-Allstudentdata' element={<AllStudentData />} />
        <Route path='/warden-dashboard/get-Allstudentdata/:studentId/get-studentdetail' element={<StudentDetails />} />
        <Route path='/warden-dashboard/get-Allstudentdata/:studentId/:complaintType/get-studentcomplaint' element={<OneStudentComplaint />} />
        <Route path='/warden-dashboard/:complaintId?/complaintDetails' element={<ComplaintDetails />} />
        <Route path='/warden-dashboard/get-Allstudentdata/:studentId/get-Meals-record' element={<VotedOnPolls />} />
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
