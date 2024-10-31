import React from 'react';
import StuComplaints from './StuComplaints';
import { useNavigate } from 'react-router-dom'
import studentProfile_Bg from '../../../assets/StudentProfile_Bg.jpg'

function StuProfile() {

  const navigate = useNavigate();
  const Raise_New_Complaint = () => {
    navigate('/RaiseComplaint')
  }
  const Show_Previous_Complaints = () => {
    navigate('/MyComplaints')
  }
  return (
    <div className="h-[100vh] bg-center bg-cover" style={{ backgroundImage: `url(${studentProfile_Bg})` }}>
      <nav className="bg-gray-900 shadow-lg rounded-md py-3">
        <div className="flex justify-between max-w-[95vw] items-center mx-auto">
          <h1 className="text-2xl font-semibold text-white">PHCET Boy's Hostel</h1>
          <div className="flex items-center justify-center gap-3">
            {/* Meal Poll button  */}
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
              // onClick={Show_Meal_Poll}
            >
              Meal Poll
            </button>
            {/* New Complaint Button */}
            <button
              className="bg-gradient-to-r from-green-500 to-green-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={Raise_New_Complaint}
            >
              New Complaint
            </button>

            {/* My Complaints Button */}
            <button
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={Show_Previous_Complaints}
            >
              My Complaints
            </button>

            {/* Logout Button */}
            <button
              className="bg-gradient-to-r from-red-500 to-red-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 transition duration-300 ease-in-out transform hover:scale-105">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl px-6 py-3">
        <h2 className="text-3xl font-semibold text-white mb-6">Profile</h2>
        <div className="bg-gray-800 rounded-lg shadow-md p-6 max-w-3xl">
          <div className="border-b pb-4 mb-4">
            <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg transition duration-200 hover:bg-gray-600">
              <span className="text-gray-300 font-medium text-lg">Name:</span>
              <span className="text-white font-semibold text-lg">Chinmay Ankolekar</span>
            </div>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg transition duration-200 hover:bg-gray-600">
            <span className="text-gray-300 font-medium text-lg">Hostel ID:</span>
            <span className="text-white font-semibold text-lg">12345</span>
          </div>
        </div>
      </main>

      {/* RECENT COMPLAINTS */}
      <h2 className="text-3xl ml-5 font-semibold  mb-6">Recent Complaint</h2>

      <div>
        {/* <StuComplaints /> */}
        {/* here dynamically the first complaint from list  must be displayed which is going to be fetched from database */}
      </div>
    </div>
  );
}

export default StuProfile;
