import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../../../assets/Intopage/logo.png";
import { useUserContext } from "../../../Context/userContext";


function StudentDashboard() {
  const { userData } = useUserContext();
  const navigate = useNavigate()
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showSideBarAtResponsivePhase, setshowSideBarAtResponsivePhase] =
    useState(false);
  const [showComplaintoption, setshowComplaintOption] = useState(false)
  const {Logout} = useUserContext();

  const handleSidebarToggle = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleSidebarToggleAtResponsiveness = () => {
    setshowSideBarAtResponsivePhase(!showSideBarAtResponsivePhase);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen relative">
      {/* Left Sidebar */}
      <div
        className={`${showSideBarAtResponsivePhase ? "block absolute z-50" : "hidden"
          } lg:flex bg-gradient-to-b from-blue-600 to-blue-400 text-white  flex-col justify-between h-screen transition-all duration-500 ease-in-out ${isSidebarExpanded || isHovered
            ? "md:w-72 md:p-5 w-44 p-2.5"
            : "md:w-16 md:p-2"
          }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div>
          {/* Logo Section */}
          <div className="flex items-center gap-4 ">
            <img
              src={logo}
              className={`${isSidebarExpanded || isHovered
                ? "md:w-14 md:h-14 w-10 h-10"
                : "md:w-12 md:h-12 w-10 h-10"
                } rounded-full shadow-lg`}
              alt="clg logo"
            />
            <div
              className={`flex items-center justify-between w-full ${isSidebarExpanded || isHovered ? "" : "hidden"
                } `}
            >
              <h2 className="font-serif font-bold text-md md:text-lg lg:text-xl tracking-wide">
                PHCET
              </h2>
              <span
                onClick={handleSidebarToggle}
                className="material-symbols-outlined font-semibold text-xl cursor-pointer hover:text-gray-300 hidden md:block"
              >
                {isSidebarExpanded ? "chevron_left" : "close"}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-8">
            <ul className="flex flex-col gap-4">
              {[
                { icon: "dashboard", label: "Dashboard", link: "" },
                {
                  icon: "back_hand",
                  label: "Complaint",
                  subItems: [
                    {
                      label: "Raise Complaint",
                      link: "/student-dashboard/raise-complaint",
                    },
                    {
                      label: "Review Complaints",
                      link: "/student-dashboard/review-complaints",
                    },
                  ],
                },
                {
                  icon: "restaurant",
                  label: "Meal Poll",
                  link: "/student-dashboard/vote",
                },
                {
                  icon: "join_inner",
                  label: "Match Partner",
                  link: "/student-dashboard/find-match",
                },
              ].map((item, index) => (
                <li key={index}>
                  {item.subItems ? (
                    <div>
                      <div onMouseEnter={() => setshowComplaintOption(!showComplaintoption)} className="flex items-center gap-1.5 md:gap-3 px-1.5 py-1 md:px-3 md:py-2 rounded-md cursor-pointer transition hover:bg-blue-500 hover:shadow-md">
                        <span
                          className={`material-symbols-outlined text-lg ${isSidebarExpanded || isHovered
                            ? "text-sm sm:text-md md:text-lg lg:text-2xl"
                            : ""
                            }`}
                        >
                          {item.icon}
                        </span>
                        <span
                          className={`font-serif text-sm md:text-lg tracking-wide ${isSidebarExpanded || isHovered ? "" : "hidden"
                            }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      <ul onMouseLeave={() => setshowComplaintOption(!showComplaintoption)} className={`pl-6 mt-2 ${showComplaintoption ? "" : "hidden"}`}>
                        {/* <ul className={`pl-6 mt-2 hidden`}> */}
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <NavLink
                              to={subItem.link}
                              className={({ isActive }) =>
                                isActive
                                  ? "bg-orange-200 hover:bg-orange-300 text-slate-500 flex items-center gap-1.5 md:gap-3 px-1.5 py-1 md:px-3 md:py-2 rounded-md cursor-pointer transition hover:shadow-md"
                                  : "flex items-center gap-1.5 md:gap-3 px-1.5 py-1 md:px-3 md:py-2 rounded-md cursor-pointer transition hover:bg-blue-500 hover:shadow-md"
                              }
                            >
                              <span className="font-serif text-xs sm:text-base">
                                {subItem.label}
                              </span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <NavLink
                      to={item.link}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-orange-200 hover:bg-orange-300 text-slate-500 flex items-center gap-1.5 md:gap-3 px-1.5 py-1 md:px-3 md:py-3 rounded-md cursor-pointer transition hover:shadow-md whitespace-nowrap"
                          : "flex items-center gap-1.5 md:gap-3 px-1.5 py-1 md:px-3 md:py-3 rounded-md cursor-pointer transition hover:bg-blue-500 hover:shadow-md whitespace-nowrap"
                      }
                    >
                      <span
                        className={`material-symbols-outlined text-lg ${isSidebarExpanded || isHovered
                          ? "text-sm sm:text-md md:text-lg lg:text-2xl"
                          : ""
                          }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`font-serif text-sm md:text-lg tracking-wide ${isSidebarExpanded || isHovered ? "" : "hidden"
                          }`}
                      >
                        {item.label}
                      </span>
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Logout section  */}
        <div className="flex items-center gap-1.5 md:gap-3 px-1.5 py-1 md:px-3 md:py-2 text-lg font-serif rounded-md cursor-pointer transition hover:bg-blue-500 hover:shadow-md">
          <span className="material-symbols-outlined">
            logout
          </span>
          <span
          onClick={()=>{
            Logout()
            navigate("/Login_SignIn/login")
          }}
            className={`font-serif text-sm md:text-lg tracking-wide ${isSidebarExpanded || isHovered ? "" : "hidden"}`}
          >Logout</span>
        </div>

      </div>

      {/* Main Content Area */}
      <div className="w-full relative h-[100vh] overflow-y-auto bg-white shadow-lg ">
        {/* Header Section - Visible on smaller screens */}
        <header className="lg:hidden sticky top-0 z-30 flex justify-between items-center p-2 bg-blue-500 text-white">
          <div className="flex items-center gap-1 sm:gap-4">
            <img
              src={logo}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-lg"
              alt="logo"
            />
            <div className="flex justify-center items-center gap-2">
              <h2 className="font-serif font-bold text-sm sm:text-lg tracking-wide">
                PHCET
              </h2>
              <div className="h-5 w-0.5 rounded-full bg-white"></div>
              <div className="font-serif font-semibold text-xs xs:text-sm md:text-md  text-white">
                Student Dashboard
              </div>
            </div>
          </div>
          <div className="flex  justify-center items-center gap-2">
            <span
              onClick={handleSidebarToggleAtResponsiveness}
              className="material-symbols-outlined font-semibold text-lg sm:text-xl cursor-pointer hover:text-gray-300"
            >
              {showSideBarAtResponsivePhase ? "close" : "menu"}
            </span>
            <div className="w-8 h-8 md:w-10 md:h-10 flex justify-center items-center relative group cursor-pointer">
              <img
                src={userData.avatar}
                className="w-full h-full rounded-full object-cover border-2 border-slate-900 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl"
                alt="profile img"
                onClick={() => navigate('/student-dashboard/profile')}
              />
            </div>
          </div>
        </header>

        {/* Outlet for other components */}
        <div className="h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
