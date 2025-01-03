import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AllStudentData = () => {
  const navigate = useNavigate()
  const [requestSort, setRequestSort] = useState({
    department: "",
    studentEmailOrPhone: "",
  });

  const handelInputData = (e) => {
    const { name, value } = e.target;
    setRequestSort((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for ${requestSort.studentEmailOrPhone} in ${requestSort.department}`);
  };

  const mockStudents = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890", department: "CSE" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "0987654321", department: "ECE" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", phone: "1112223333", department: "MECH" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", phone: "1112223333", department: "MECH" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", phone: "1112223333", department: "MECH" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4 ">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-800 drop-shadow-md">
          Warden User Management
        </h1>
        <p className="text-blue-600 mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
          Manage and view all hostel students easily
        </p>
      </header>

      {/* Filter and Search Section */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-8 border border-blue-200 mb-8">
        <form
          onSubmit={handleSearch}
          className="flex flex-wrap gap-4 items-center justify-between"
        >
          {/* Department Filter */}
          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="department"
              className="block text-sm sm:text-base md:text-lg font-semibold text-blue-800 mb-2"
            >
              Select Department:
            </label>
            <select
              id="department"
              value={requestSort.department}
              name="department"
              onChange={handelInputData}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 border-blue-300 text-gray-800 shadow-inner text-sm sm:text-base"
            >
              <option value="">All Departments</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
          </div>

          {/* Search Bar */}
          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="search"
              className="block text-sm sm:text-base md:text-lg font-semibold text-blue-800 mb-2"
            >
              Search by Email or Phone:
            </label>
            <input
              id="search"
              type="text"
              name="studentEmailOrPhone"
              value={requestSort.studentEmailOrPhone}
              onChange={handelInputData}
              placeholder="Enter email or phone"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 border-blue-300 text-gray-800 shadow-inner text-sm sm:text-base"
            />
          </div>

          {/* Search Button */}
          <div>
            <button
              type="submit"
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg font-medium shadow-md transition-transform transform hover:scale-105 text-sm sm:text-base"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Students Table */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-8 border border-blue-200">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-800 mb-6 text-center">
          Students List
        </h2>
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse border border-blue-300 text-left text-sm sm:text-base">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-blue-300 px-4 py-2">Name</th>
                <th className="border border-blue-300 px-4 py-2">Email</th>
                <th className="border border-blue-300 px-4 py-2">Phone</th>
                <th className="border border-blue-300 px-4 py-2">Action</th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="h-52 overflow-y-auto">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse border border-blue-300 text-left text-sm sm:text-base">
              <tbody>
                {mockStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-blue-50">
                    <td className="border border-blue-300 px-4 py-2">
                      {student.name}
                    </td>
                    <td className="border border-blue-300 px-4 py-2">
                      {student.email}
                    </td>
                    <td className="border border-blue-300 px-4 py-2">
                      {student.phone}
                    </td>
                    <td className="border border-blue-300 px-4 py-2">
                      <button
                        onClick={() =>
                          navigate("/warden-dashboard/get-studentdetail")
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-md transition-transform transform hover:scale-105 text-xs sm:text-sm md:text-base"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllStudentData;
