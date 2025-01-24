import React, { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useUserContext } from '../../../../Context/userContext'

const VotedOnPolls = () => {
  const [mealDates, setmealDates] = useState([]);
  const [displayedmealDates, setdisplayedmealDates] = useState([]);
  const { Token } = useUserContext()
  const { studentId } = useParams()
  const ref = useRef()

  const filterMealDates = (value) => {

    if (!value) {
      toast.error("Select the Month")
      return
    }

    const data = displayedmealDates.filter((dateObj) => {
      const TimeLine = new Date(dateObj.updatedAt).toLocaleDateString();

      if (parseInt(value) === parseInt(TimeLine)) {
        return dateObj;
      }
    });

    data.length > 0 ? setdisplayedmealDates(data) : toast.error("No records Available")
  };

  useEffect(() => {
    async function getMealDates() {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/meals/${studentId}/get-StudentvotedMeal-dates`, {
          method: "GET",
          headers: {
            Authorization: Token
          }
        });

        const responeData = await response.json();

        if (response.ok) {
          setmealDates(responeData.data.mealPollIds);
          setdisplayedmealDates(responeData.data.mealPollIds);
        } else {
          toast.error(responeData.message)
        }

      } catch (error) {
        toast.error(error)
      }
    }

    getMealDates();
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-r from-blue-500 to-indigo-600"
      style={{
        backgroundImage: "linear-gradient(to bottom right, #dbeafe, #93c5fd)",
      }}
    >
      {/* Header */}
      <header className="w-full text-center mb-12">
        <h1 className="text-4xl font-extrabold drop-shadow-lg tracking-wide text-blue-900">
          🥗 Meal Voting Records
        </h1>
        <p className="mt-4 text-lg text-blue-800 tracking-wide">
          View all meal voting dates and times recorded in the system for the
          selected student.
        </p>
      </header>

      {/* Card Section */}
      <section className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-4">
          <h2 className="text-2xl font-bold text-center text-white">
            Voting History
          </h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-4 bg-gray-50 p-6 rounded-lg shadow-lg">
            <select
              ref={ref}
              className="w-64 p-2 border rounded-lg shadow-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            >
              <option value="">Select Month</option>
              <option value="1">Jan</option>
              <option value="2">Feb</option>
              <option value="3">Mar</option>
              <option value="4">Apr</option>
              <option value="5">May</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Aug</option>
              <option value="9">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
            <button
              onClick={() => filterMealDates(ref?.current?.value)}
              disabled={mealDates.length === 0}
              className={`px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ${mealDates.length === 0 ? "cursor-not-allowed":""}`}
            >
              Search
            </button>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-100 text-indigo-700">
                <th className="px-4 py-2 font-semibold">Date</th>
                <th className="px-4 py-2 font-semibold">Time</th>
              </tr>
            </thead>
            <tbody>
              {displayedmealDates?.length > 0 ? (
                displayedmealDates.map((meal) => (
                  <tr
                    key={meal._id}
                    className="hover:bg-blue-100 even:bg-blue-50 transition duration-200"
                  >
                    <td className="px-4 py-2 border-b text-gray-800">
                      {new Date(meal.updatedAt).toLocaleString().split(",")[0]}
                    </td>
                    <td className="px-4 py-2 border-b text-gray-800">
                      {new Date(meal.updatedAt).toLocaleString().split(",")[1]}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="px-4 py-4 text-center text-gray-500 border-b"
                  >
                    No voting records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-sm text-indigo-700">
        Powered by <span className="font-semibold">Hostel Management System</span>
      </footer>
    </div>
  );
};

export default VotedOnPolls;
