import complaint from '../../../assets/dashboard/complaintLogo.png'
import meal from '../../../assets/dashboard/meal_logo.jpeg'
import match from '../../../assets/dashboard/match_logo.jpg'
import { useUserContext } from '../../../Context/userContext';
import { Link } from 'react-router-dom'
import { useWardenComplaintContext } from '../../../Context/WardenComplaintContext';
import { useEffect, useRef, useState } from 'react';

const Card = ({ logo, title }) => (
  <div className="relative p-2 md:p-4 md:h-32 sm:h-20  justify-around flex md:flex-col  items-center rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105 bg-white border border-gray-300">
    <div className="bg-gray-200 md:p-3 rounded-full flex items-center justify-center w-12 h-12  md:w-14 md:h-14">
      <img className="w-full h-full object-cover md:w-8 md:h-8" src={logo} alt={`${title} logo`} />
    </div>
    <div className="ml-4 flex justify-center items-center w-full ">
      <div className='text-center'>
        <h2 className="text-xs text-gray-800 font-semibold">{title}</h2>
      </div>
    </div>
  </div>
);


function WardenStart() {
  const { userData } = useUserContext();
  const [showUpdateStateValue, setshowUpdateStateValue] = useState(false);
  const [viewMealPoll, setViewMealPoll] = useState(false)
  const updatedStateref = useRef()
  const { UsersList, addedMealPoll, getMealPollById, saveTheUpdatedMealStatus, getLatestNoticePosted,Fetchednotice } = useWardenComplaintContext()
  const [mealId, setmealId] = useState(JSON.parse(localStorage.getItem("MealPollId")) || null)

  const getIST_Time = (UTC_time) => {
    const day = UTC_time.split("T")[0];
    const date = new Date(UTC_time);
    date.setMinutes(date.getMinutes() + 330);
    let hours = date.getUTCHours();
    let min = date.getUTCMinutes();
    let am_pm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    const time = `${day}  ${hours}:${min.toString().padStart(2, "0")} ${am_pm}`;
    return time;
  };

  useEffect(()=>{
    getLatestNoticePosted()
  },[Fetchednotice])

  useEffect(() => {
    if (addedMealPoll && Object.keys(addedMealPoll)?.length > 0) {
      localStorage.setItem("MealPollId", JSON.stringify(addedMealPoll._id))
    }
  }, [addedMealPoll]);

  useEffect(() => {
    if (mealId) {
      console.log("mealid")
      getMealPollById(mealId)
    }
  }, [mealId])


  return (
    <>
      <div className='font-serif'>
        <div className="w-full bg-gradient-to-b from-blue-200 to-blue-300">
          <header className="hidden  lg:flex justify-between items-center xl:pl-10 xl:pt-3 xl:pr-10 xl:pb-3 lg:p-3 md:p-2 shadow-md ">
            <div className="font-serif font-semibold md:text-md lg:text-xl xl:text-2xl text-gray-800">Warden Dashboard</div>
            <div className='flex  justify-center items-center gap-8'>
              <div className='flex flex-col md:text-sm lg:text-md xl:text-lg font-serif font-semibold'>
                <span>Hello,</span>
                <span>{userData.fullName}</span>
              </div>
              <div className="xl:w-14 xl:h-14 lg:w-12 lg:h-12 md:w-10 md:h-10 flex justify-center items-center relative group cursor-pointer">
                <img
                  src={userData.avatar}
                  className="w-full h-full rounded-full object-cover border-2 border-slate-900 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl"
                  alt="profile img"
                />
              </div>



            </div>
          </header>
          <main className="xs:grid xs:grid-cols-3 xs:gap-4 xs:p-4 p-3 ">

            {/* Left Section - 2/3 of the Grid */}
            <section className="xs:col-span-2 bg-white rounded-lg shadow-xl p-4 mb-2  ">
              <div>
                <h2 className="text-xs xs:text-sm md:text-md lg:text-lg xl:text-xl font-bold mb-2 text-gray-800">
                  Welcome to the PHCET Hostel!
                </h2>
                <div className="flex flex-col text-gray-700 text-xs xs:text-sm lg:text-md xl:text-lg">
                  <span>Your role is crucial in ensuring a well-managed and harmonious hostel environment.</span>
                  <span>Let’s work together to address student needs efficiently and maintain a thriving community!</span>
                  <span>Have a productive day ahead, {userData.fullName}!</span>
                </div>
              </div>

              <div className="xs:pt-3 pt-2 md:pt-4 lg:pt-6 xl:pt-8 grid sm:grid-cols-2 md:grid-cols-4  gap-4" >
                <Link to="/warden-dashboard/view-complaints">
                  <Card
                    logo={complaint}
                    title="View Complaint"
                    description="Quick resolution for issues."
                  />
                </Link>
                <Link to="/warden-dashboard/add-meal">
                  <Card
                    logo={meal}
                    title="Add Meal"
                    description="Tailor meals to your needs."
                  />
                </Link>
                <Link to="/warden-dashboard/give-notice">
                  <Card
                    logo={match}
                    title="Notice"
                    description="This is a dummy card for testing purposes."
                  />
                </Link>
                <Link to="/warden-dashboard/get-Allstudentdata">
                  <div>
                    <Card
                      logo={match}
                      title="Students"
                      description="Find your perfect match easily."
                    />
                  </div>
                </Link>
              </div>

            </section>

            {/* Right Section - 1/3 of the Grid */}
            <section className="xs:col-span-1 bg-gradient-to-b from-gray-50 to-gray-200 md:p-4 lg:p-6 rounded-lg shadow-xl border border-gray-300 relative">
              <div className="p-4 font-serif flex flex-col justify-center">
                <h2 className="md:text-md text-sm lg:text-lg font-semibold mb-4 text-gray-800">
                  Meal Vote Count:
                </h2>

                {/* View Button */}
                <button
                  onClick={() => {
                    setViewMealPoll(true)
                  }}
                  className="absolute top-4 right-4 bg-teal-500 text-white text-xs sm:text-sm lg:text-md px-4 py-2 rounded-lg shadow-md hover:bg-teal-600 transition-all duration-300">
                  View
                </button>

                <div className="grid grid-cols-3 xs:grid-cols-1 gap-4 xs:gap-6">
                  {addedMealPoll?.meals?.length > 0 &&
                    addedMealPoll.meals.map((meal) => (
                      <label
                        key={meal._id}
                        htmlFor="Pending"
                        className="flex flex-col bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="flex items-center justify-between gap-1 mb-2">
                          {/* Display Meal Name */}
                          <span className="text-xs xs:text-sm sm:text-md font-medium text-teal-700">
                            {meal.menu}
                          </span>
                          {/* Display Vote Count */}
                          <span className="text-xs xs:text-sm sm:text-md font-medium text-teal-700">
                            {meal?.count}/{UsersList?.length}
                          </span>
                        </div>
                        <input
                          type="range"
                          name={meal.menu}
                          id={meal.menu}
                          min={0}
                          max={UsersList?.length}
                          value={meal.count}
                          className="mt-1 accent-teal-500 cursor-not-allowed"
                          readOnly
                        />
                      </label>
                    ))}
                </div>
              </div>
            </section>


          </main>
        </div>
        <div className="md:grid  md:grid-cols-3 p-2 pt-2 mt-0 gap-4">
          {/* Notice board */}
          <div className="md:col-span-1 ">
            <div className="p-4 pt-3 m-1 bg-gradient-to-b from-teal-100 to-teal-300 shadow-lg rounded-xl h-full  border-2 border-gray-200 ">
              <h2 className='text-center text-sm lg:text-lg xl:text-xl font-bold text-gray-700 mb-5'>Today's Notice</h2>
              <div className="text-gray-600 max-h-48 mr-1 text-xs xs:text-sm md:text-md xl:text-lg flex justify-start font-semibold overflow-y-auto">
                {Object.keys(Fetchednotice).length > 0 ? (
                  <div>
                    <p className="text-blue-700 flex md:flex-col justify-between text-md mb-4">
                      <span>Date:{new Date(Fetchednotice.createdAt).toLocaleString().split(",")[0]}</span>
                      <span>Time:{new Date(Fetchednotice.createdAt).toLocaleString().split(",")[1]}</span>
                    </p>
                    <p className="text-gray-800 text-base sm:text-lg lg:text-xl font-medium leading-relaxed">
                      {Fetchednotice.notice}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500 italic text-center">No notice posted yet.</p>
                )}
              </div>
            </div>
          </div>
          {/* Complaints Table Section */}
          <div className="xs:col-span-2 p-4 bg-orange-300 shadow-md rounded-xl m-1 border-2">
            <header className="flex justify-between items-center mb-4">
              <div className="text-sm lg:text-md xl:text-lg font-semibold text-gray-800">Users</div>

            </header>

            {/* Table Design */}
            <div>
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md table-auto w-full ">
                <thead className="bg-teal-500 text-white ">
                  <tr>
                    <th className="px-0.5 py-0.5 sm:py-2 text-xs sm:text-sm  text-center  font-semibold sm:uppercase tracking-wider border-b border-gray-200">
                      Name
                    </th>
                    <th className="px-0.5 py-0.5 sm:py-2 text-xs sm:text-sm  text-center font-semibold  sm:uppercase tracking-wider border-b border-gray-200">
                      Email
                    </th>
                    <th className="px-0.5 py-0.5 sm:py-2 text-xs sm:text-sm text-center  font-semibold  sm:uppercase tracking-wider border-b border-gray-200">
                      Phone
                    </th>

                  </tr>
                </thead>
              </table>
              <div className="overflow-y-auto max-h-[24vh]">
                <table className="w-full bg-white">
                  <tbody className="divide-y text-xs sm:text-sm sm:text-md divide-gray-400">

                    {
                      (UsersList?.length !== 0) &&
                      UsersList?.map((data) => (
                        <tr key={data._id} className="hover:bg-gray-100 transition duration-200 ">
                          <td className="sm:px-4 sm:py-4 px-2 py-1  text-gray-800 truncate max-w-[50px] sm:max-w-[100px]">
                            {data.fullName}
                          </td>
                          <td className="sm:px-4 sm:py-4 px-2 py-1  text-gray-600 truncate  max-w-[100px] sm:max-w-[210px]" >
                            {data.email}
                          </td>
                          <td className="sm:px-4 sm:py-4 px-2 py-1  text-gray-800 truncate ">
                            {data.phone}
                          </td>
                          {/* <td className={`sm:px-4 sm:py-4 px-2 py-1  font-semibold ${data.state === "Pending" ? "text-yellow-600" : ""}  ${data.state === "Inprogress" ? "text-blue-600" : ""}  ${data.state === "Resolved" ? "text-green-600" : ""}  truncate text-center `}>
                                                        {data.state}
                                                    </td> */}
                        </tr>
                      ))
                    }

                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* this is observed when the view btn is clicked in the meal poll section */}
      {
        viewMealPoll && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative z-10 max-w-lg w-full bg-gradient-to-r from-blue-50 to-white p-8 rounded-2xl shadow-lg shadow-blue-500 backdrop-blur-lg">

              {/* Close Button (Cross) */}
              <button
                onClick={() => setViewMealPoll(false)}
                className="absolute top-4 left-4 text-2xl font-bold text-gray-700 hover:text-gray-900 transition-all duration-300"
              >
                &times;
              </button>

              {/* Poll Status Indicator */}
              <div className="absolute top-4 right-4 flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${addedMealPoll?.pollStatus === "active" ? "bg-green-500" : "bg-red-400"}`}
                ></div>
                <span className="text-sm font-semibold text-gray-800">
                  {addedMealPoll?.pollStatus === "active" ? "Active" : "Inactive"}
                </span>
              </div>

              <h2 className="text-3xl font-extrabold text-blue-800 text-center mb-6">
                View Meal Options
              </h2>

              {/* Meal Options */}
              <form className="space-y-6">
                {addedMealPoll?.meals?.length > 0 &&
                  addedMealPoll.meals.map((meal) => (
                    <div key={meal._id} className="space-y-2">
                      <input
                        type="text"
                        name={meal.menu}
                        value={meal.menu}
                        disabled
                        className="w-full p-4 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 transition-all ease-in-out duration-200"
                      />
                    </div>
                  ))}

                {/* Poll Deadline */}
                <div>
                  <label htmlFor="pollDeadline" className="block text-lg font-semibold text-blue-600 mb-2">
                    Poll Deadline
                  </label>
                  <input
                    type="text"
                    id="pollDeadline"
                    name="pollDeadline"
                    value={getIST_Time(addedMealPoll?.pollDeadline)}
                    className="w-full p-4 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 transition-all ease-in-out duration-200"
                  />
                </div>
              </form>

              {/* Buttons */}
              <div className="flex justify-start gap-3 items-center mt-8">
                {showUpdateStateValue ? (
                  <button
                    onClick={() => {
                      saveTheUpdatedMealStatus({
                        mealId,
                        stateValue: updatedStateref.current.value
                      });
                      setshowUpdateStateValue(!showUpdateStateValue);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition-all duration-300"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setshowUpdateStateValue(!showUpdateStateValue)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition-all duration-300"
                  >
                    Update status
                  </button>
                )}

                <label className={`${showUpdateStateValue ? "flex items-center" : "hidden"}`}>
                  <input
                    ref={updatedStateref}
                    type="radio"
                    className="form-radio text-blue-600"
                    value={addedMealPoll?.pollStatus === "active" ? "inactive" : "active"}
                    checked
                    readOnly
                  />
                  <span className="ml-2 text-gray-800">
                    {addedMealPoll?.pollStatus === "active" ? "Inactive" : "Active"}
                  </span>
                </label>
              </div>
            </div>
          </div>
        )
      }



    </>
  );
}

export default WardenStart; 