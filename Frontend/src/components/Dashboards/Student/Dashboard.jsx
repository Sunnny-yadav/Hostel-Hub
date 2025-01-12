import complaint from '../../../assets/dashboard/complaintLogo.png'
import meal from '../../../assets/dashboard/meal_logo.jpeg'
import match from '../../../assets/dashboard/match_logo.jpg'
import pending from '../../../assets/dashboard/pending.png'
import resolved from '../../../assets/dashboard/resolved.png'
import inprogress from '../../../assets/dashboard/inprogress.png'
import { useUserContext } from '../../../Context/userContext';
import { Link, useNavigate } from 'react-router-dom'
import { useComplaintContext } from '../../../Context/complaintContext'
import { useWardenComplaintContext } from '../../../Context/WardenComplaintContext'
import { useEffect } from 'react'


const Card = ({ logo, title, description }) => (
    <div className="md:flex-row lg:flex-col  relative sm:p-1 md:p-2  lg:p-3 xl:p-4 bg-white shadow-xl xl:w-60 flex flex-col items-center  rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 hover:bg-teal-50">
        <div className="lg:absolute  lg:top-[-20px] xl:top-[-30px] lg:left-1/2 lg:transform lg:-translate-x-1/2 mt-1.5  md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16  xl:h-16 bg-teal-600 rounded-full flex items-center justify-center shadow-md">
            <img className="w-10 h-10 object-contain" src={logo} alt={`${title} logo`} />
        </div>
        <h2 className="mt-3 md:mt-4 lg:mt-5 xl:mt-6 text-xs sm:text-sm lg:text-md xl:text-lg font-semibold text-gray-800 text-center">{title}</h2>
        <p className=" md:hidden lg:block text-xs xs:text-sm lg:text-md text-gray-600 text-center mt-3 leading-relaxed">{description}</p>
    </div>
);

function Dashboard() {
    const { userData } = useUserContext();
    const navigate = useNavigate();
    const { FetchedComplaintsById } = useComplaintContext();
    const {getLatestNoticePosted,Fetchednotice } = useWardenComplaintContext();

    useEffect(()=>{
        getLatestNoticePosted()
      },[Fetchednotice])
    
    return (
        <>
            <div className='font-serif'>
                <div className="w-full bg-gradient-to-b from-blue-200 to-blue-300">
                    <header className="hidden  lg:flex justify-between items-center xl:pl-10 xl:pt-3 xl:pr-10 xl:pb-3 lg:p-3 md:p-2 shadow-md ">
                        <div className="font-serif font-semibold md:text-md lg:text-xl xl:text-2xl text-gray-800">Student Dashboard</div>
                        <div className='flex  justify-center items-center gap-8'>
                            <div className='flex flex-col md:text-sm lg:text-md xl:text-lg font-serif font-semibold'>
                                <span>Hello,</span>
                                <span>{userData.fullName}</span>
                            </div>
                            <div className="xl:w-14 xl:h-14 lg:w-12 lg:h-12 md:w-10 md:h-10 flex justify-center items-center relative group cursor-pointer">
                                <img
                                    src={userData.avatar}
                                    onClick={()=> navigate('/student-dashboard/profile')}
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
                                <h2 className="text-xs xs:text-sm md:text-md lg:text-lg xl:text-xl font-bold mb-2 text-gray-800">Welcome to the PHCET Hostel!</h2>
                                <div className="flex flex-col text-gray-700 text-xs xs:text-sm lg:text-md xl:text-lg">
                                    <span>Your convenience is our priority. Let’s work together to create a better hostel life!</span>
                                    <span>Have a great day ahead, {userData.fullName}!</span>
                                </div>
                            </div>
                            <div className="xs:pt-3 pt-2 md:pt-4 lg:pt-6 xl:pt-8 grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3  gap-4 ">
                                <Link to="/student-dashboard/raise-complaint">
                                    <Card
                                        logo={complaint}
                                        title="Raise Complaint"
                                        description="Quick resolution for issues."
                                    />
                                </Link>
                                <Link to="/student-dashboard/vote">
                                    <Card
                                        logo={meal}
                                        title=" Meal Poll"
                                        description=" Tailor meals to your needs"
                                    />
                                </Link>
                                <Link to="/student-dashboard/find-match">
                                    <Card
                                        logo={match}
                                        title="  Partner Suggestions"
                                        description=" Find your perfect match easily"
                                    /></Link>
                            </div>
                        </section>

                        {/* Right Section - 1/3 of the Grid */}
                        <section className="xs:col-span-1 bg-gray-100 md:p-4 lg:p-6 rounded-lg shadow-md ">
                            <div className="p-2 font-serif flex flex-col justify-center">
                                <h2 className="md:text-md text-sm lg:text-lg font-semibold mb-4 text-gray-800">Complaint Bar</h2>
                                <div className="grid grid-cols-3 xs:grid-cols-1 gap-2  xs:gap-4">
                                    <label htmlFor="Pending" className="flex flex-col">
                                        <div className='flex items-center gap-1'>
                                            <img src={pending} className='w-7' alt="" />
                                            <span className="text-xs  xs:text-sm sm:text-md font-medium text-gray-700">Pending</span>
                                        </div>
                                        <input
                                            type="range"
                                            name="Pending"
                                            id="Pending"
                                            className="mt-1 accent-teal-500"
                                        />
                                    </label>
                                    <label htmlFor="Inprogress" className="flex flex-col">
                                        <div className='flex items-center gap-1'>
                                            <img src={inprogress} className='w-7' alt="" />
                                            <span className="text-xs  xs:text-sm sm:text-md font-medium text-gray-700">Inprogress</span>
                                        </div>
                                        <input
                                            type="range"
                                            name="Inprogress"
                                            id="Inprogress"
                                            className="mt-1 accent-teal-500"
                                        />
                                    </label>
                                    <label htmlFor="Resolved" className="flex flex-col">
                                        <div className='flex items-center justify-start gap-1'>
                                            <img src={resolved} className='w-7' alt="" />
                                            <span className="text-xs  xs:text-sm sm:text-md font-medium text-gray-700">Resolved</span>
                                        </div>
                                        <input
                                            type="range"
                                            name="Resolved"
                                            id="Resolved"
                                            className="mt-1 accent-teal-500"
                                        />
                                    </label>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
                <div className="md:grid  md:grid-cols-3 p-2 pt-2 mt-0 gap-4">
                    {/* Notice board */}
                    <div className="md:col-span-1 ">
                        <div className="p-4 pt-3 m-1 bg-gradient-to-b from-teal-100 to-teal-300 shadow-lg rounded-xl h-full  border-2 border-gray-200 ">
                            <h2 className='text-center text-sm lg:text-lg xl:text-xl font-bold text-gray-700 mb-5'>Notice Board</h2>
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
                            <div className="text-sm lg:text-md xl:text-lg font-semibold text-gray-800">My Complaints</div>
                            <div>
                                {/* Filter Dropdown */}
                                <select
                                    name="filter"
                                    id="filter"
                                    className="lg:px-3 lg:py-2 px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-xs sm:text-sm"
                                >
                                    <option value="All">All</option>
                                    <option value="24hrs">Last 24 Hours</option>
                                    <option value="1week">Last 1 Week</option>
                                    <option value="1month">Last 1 Month</option>
                                </select>
                            </div>
                        </header>

                        {/* Table Design */}
                        <div>
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md table-auto w-full ">
                                <thead className="bg-teal-500 text-white ">
                                    <tr>
                                        <th className="px-0.5 py-0.5 sm:py-2 text-xs sm:text-sm  text-center  font-semibold sm:uppercase tracking-wider border-b border-gray-200">
                                            Title
                                        </th>
                                        <th className="px-0.5 py-0.5 sm:py-2 text-xs sm:text-sm  text-center font-semibold  sm:uppercase tracking-wider border-b border-gray-200">
                                            Description
                                        </th>
                                        <th className="px-0.5 py-0.5 sm:py-2 text-xs sm:text-sm text-center  font-semibold  sm:uppercase tracking-wider border-b border-gray-200">
                                            Created At
                                        </th>
                                        <th className="px-0.5 py-0.5 sm:py-2 text-xs sm:text-sm  text-center font-semibold  sm:uppercase tracking-wider border-b border-gray-200">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                            <div className="overflow-y-auto max-h-[24vh]">
                                <table className="w-full bg-white">
                                    <tbody className="divide-y text-xs sm:text-sm sm:text-md divide-gray-400">

                                        {
                                            (FetchedComplaintsById.length !== 0) &&
                                            FetchedComplaintsById.map((data) => (
                                                <tr key={data._id} className="hover:bg-gray-100 transition duration-200 ">
                                                    <td className="sm:px-4 sm:py-4 px-2 py-1  text-gray-800 truncate max-w-[50px] sm:max-w-[100px]">
                                                        {data.Title}
                                                    </td>
                                                    <td className="sm:px-4 sm:py-4 px-2 py-1  text-gray-600 truncate  max-w-[100px] sm:max-w-[210px]" >
                                                        {data.Description}
                                                    </td>
                                                    <td className="sm:px-4 sm:py-4 px-2 py-1  text-gray-800 truncate ">
                                                        {data.createdAt.split("T")[0]}
                                                    </td>
                                                    <td className={`sm:px-4 sm:py-4 px-2 py-1  font-semibold ${data.state === "Pending" ? "text-yellow-600" : ""}  ${data.state === "Inprogress" ? "text-blue-600" : ""}  ${data.state === "Resolved" ? "text-green-600" : ""}  truncate text-center `}>
                                                        {data.state}
                                                    </td>
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
        </>
    );
}

export default Dashboard; 