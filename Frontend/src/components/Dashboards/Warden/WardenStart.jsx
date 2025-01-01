import complaint from '../../../assets/dashboard/complaintLogo.png'
import meal from '../../../assets/dashboard/meal_logo.jpeg'
import match from '../../../assets/dashboard/match_logo.jpg'
import pending from '../../../assets/dashboard/pending.png'
import resolved from '../../../assets/dashboard/resolved.png'
import inprogress from '../../../assets/dashboard/inprogress.png'
import { useUserContext } from '../../../Context/userContext';
import { Link } from 'react-router-dom'
import { useComplaintContext } from '../../../Context/complaintContext'

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
  // const { FetchedComplaintsById } = useComplaintContext();

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
                <Link to="/warden-dashboard/find-match">
                  <Card
                    logo={match}
                    title="Student"
                    description="Find your perfect match easily."
                  />
                </Link>
                <Link to="/warden-dashboard/find-match">
                <div>
                  <Card
                    logo={match}  
                    title="Notice"
                    description="This is a dummy card for testing purposes."
                  />
                </div>
                </Link>
              </div>

            </section>

            {/* Right Section - 1/3 of the Grid */}
            <section className="xs:col-span-1 bg-gray-100 md:p-4 lg:p-6 rounded-lg shadow-md ">
              <div className="p-2 font-serif flex flex-col justify-center">
                <h2 className="md:text-md text-sm lg:text-lg font-semibold mb-4 text-gray-800">Meal Vote Count : </h2>
                {/* <div className="grid grid-cols-3 xs:grid-cols-1 gap-2  xs:gap-4">
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
                </div> */}
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
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. In error, distinctio sapiente eius corporis possimus ipsam fugiat. Hic corrupti vero dolorem similique deleniti ducimus quibusdam temporibus. Quod delectus provident non consectetur odio eligendi, ullam ut error recusandae labore eos molestias numquam inventore velit facilis voluptas maxime eaque quis perspiciatis corporis dicta rem rerum. Ipsa ex, reprehenderit laboriosam et voluptatem expedita quo ab veritatis laudantium voluptatibus modi ullam, iste debitis, unde libero minima officiis perspiciatis dicta quidem enim placeat laborum repusandae, nemo quo sit at beatae maiores! Voluptatem nostrum iste doloribus perferendis dolor consequatur temporibus, numquam nulla rem labore voluptas distinctio ex tempore corrupti magni nisi consequuntur ipsum iure impedit inventore maxime fuga expedita ducimus! Corporis, iure. Ad ea sed esse ex autem nesciunt et optio aperiam accusantium! Corrupti error voluptatem, officia totam quam labore eos tenetur mollitia?
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
                    <th className="px-0.5 py-0.5 sm:py-2 text-xs sm:text-sm  text-center font-semibold  sm:uppercase tracking-wider border-b border-gray-200">
                      View
                    </th>
                  </tr>
                </thead>
              </table>
              <div className="overflow-y-auto max-h-[24vh]">
                <table className="w-full bg-white">
                  {/* <tbody className="divide-y text-xs sm:text-sm sm:text-md divide-gray-400">

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

                                    </tbody> */}
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default WardenStart; 