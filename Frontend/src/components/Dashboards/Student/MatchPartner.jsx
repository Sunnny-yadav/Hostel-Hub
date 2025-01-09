import React, { useEffect, useState } from "react";
import NoMatch from "../../../assets/dashboard/NoMatch.jpg";
import {useUserContext} from '../../../Context/userContext'

const MatchPartner = () => {
const [students, setStudents] = useState()
const {Token} = useUserContext()
  // const students = [
  //   {
  //     image: "https://randomuser.me/api/portraits/men/10.jpg",
  //     name: "Aryan Mehta",
  //     roomNumber: "B-102",
  //     branch: "CSE",
  //     year: "3rd Year",
  //   },
  //   {
  //     image: "https://randomuser.me/api/portraits/women/0.jpg",
  //     name: "Priya Sharma",
  //     roomNumber: "C-205",
  //     branch: "ECS",
  //     year: "2nd Year",
  //   },
  //   {
  //     image: "https://randomuser.me/api/portraits/men/30.jpg",
  //     name: "Rohan Gupta",
  //     roomNumber: "D-310",
  //     branch: "ME",
  //     year: "1st Year",
  //   },
  //   {
  //     image: "https://randomuser.me/api/portraits/women/40.jpg",
  //     name: "Simran Kaur",
  //     roomNumber: "A-120",
  //     branch: "IT",
  //     year: "4th Year",
  //   },
  //   {
  //     image: "https://randomuser.me/api/portraits/men/50.jpg",
  //     name: "Kunal Patel",
  //     roomNumber: "E-101",
  //     branch: "CE",
  //     year: "2nd Year",
  //   },
  // ];

  useEffect(()=>{
    async function getMatchedPartner(){
      try {
        const response = await fetch("http://localhost:8000/api/v1/users/get-matched-profiles",{
          method:"GET",
          headers:{
            Authorization: Token
          }
        });

        const responseData = await response.json();
console.log(responseData.data)
        if(response.ok){
          setStudents(responseData.data)
        }else{
          console.log(responseData.message)
        }
      } catch (error) {
        console.log("error while fetching matched partner",error)
      }
    }

    getMatchedPartner()

  },[])

  

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 py-8 px-4 sm:px-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-700 text-white text-center p-6 rounded-lg shadow-xl mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
          Meet Like-Minded People!
        </h1>
        <p className="mt-3 text-sm sm:text-base opacity-80">
          Discover fellow students who share your hobbies and interests.
          Build friendships, collaborate, and create memorable experiences in
          the hostel!
        </p>
      </div>

      {/* Student Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {students && students.length > 0 ? (
          students.map((student, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-6 space-y-4 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            >
              {/* Student Image */}
              <img
                src={student.avatar}
                alt={`${student.fullName}'s profile`}
                className="w-32 h-32 rounded-full object-cover shadow-lg"
              />

              {/* Student Details - Name */}
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {student.fullName}
                </h2>
              </div>

              {/* Student Details - Information Fields */}
              <div className="w-full space-y-2 text-sm sm:text-base text-gray-600">
                <div className="flex justify-between">
                  <strong className="text-teal-600">Room Number:</strong>
                  <span>{student.roomNumber}</span>
                </div>

                <div className="flex justify-between">
                  <strong className="text-teal-600">Branch:</strong>
                  <span>{student.branchName}</span>
                </div>

                <div className="flex justify-between">
                  <strong className="text-teal-600">Year:</strong>
                  <span>{student.currentYear}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center p-8 bg-gray-50 rounded-lg shadow-lg space-y-6">
            <img
              src={NoMatch}
              alt="No match found"
              className="mx-auto w-40 sm:w-56 h-40 sm:h-56 rounded-xl shadow-lg mb-4"
            />
            <p className="text-xl sm:text-2xl font-semibold text-gray-800">
              Oops! No matches found with similar hobbies.
            </p>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Don't worry! Update your hobbies or add new ones to get personalized match suggestions.
            </p>
            <button
              className="mt-4 px-4 sm:px-6 md:px-8 py-3 bg-teal-500 text-white text-lg sm:text-xl font-semibold rounded-full hover:bg-teal-600 transition-all duration-300"
              onClick={() => alert("Redirect to update hobbies")}
            >
              Update Hobbies
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchPartner;
