import React from 'react'
import { useNavigate } from 'react-router-dom'
import studentProfile_Bg from '../../../assets/StudentProfile_Bg.jpg'
import StuComplaints from './StuComplaints'

function MyComplaints() {
    const navigate = useNavigate()
    const Back_To_Profile =()=>{
        navigate('/studentProfile')
    }
  return (
    <>
    <div className="h-[100vh] bg-center bg-cover" style={{ backgroundImage: `url(${studentProfile_Bg})` }}>
      <nav className="bg-gray-900 shadow-lg rounded-md py-3">
        <div className="flex justify-between max-w-[95vw] items-center mx-auto">
          <h1 className="text-2xl font-semibold text-white">My Complaints</h1>
            <button
              className="bg-gradient-to-r from-red-500 to-red-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={Back_To_Profile}
              >
              Back To Profile 
            </button>
        </div>
      </nav>
        <main>
            {/* complaints will be displayed here using loop  */}
            {/* <StuComplaints/>
            <StuComplaints/> */}
        </main>
    </div>
    </>
  )
}

export default MyComplaints