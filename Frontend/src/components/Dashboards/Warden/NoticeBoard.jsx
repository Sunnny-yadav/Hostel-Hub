import React, { useState } from "react";

const NoticeBoard = () => {
  const [notice, setNotice] = useState("");

  const handleNoticeChange = (e) => {
    setNotice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Notice submitted successfully!"); // You can replace this with backend API integration
    setNotice("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4 sm:p-8 font-serif">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-800 drop-shadow-md ">Notice Board</h1>
        <p className="text-blue-600 mt-2 text-base sm:text-lg lg:text-xl">Post daily notices for students with ease</p>
      </header>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-blue-200">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="notice"
            className="block text-lg sm:text-xl font-semibold text-blue-800 mb-3"
          >
            Today's Notice:
          </label>
          <textarea
            id="notice"
            rows="6"
            value={notice}
            onChange={handleNoticeChange}
            placeholder="Type your notice here..."
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 border-blue-300 text-gray-800 resize-none shadow-inner"
            required
          ></textarea>
          <button
            type="submit"
            className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-5 rounded-lg font-medium shadow-md transition-transform transform hover:scale-105"
          >
            Post Notice
          </button>
        </form>
      </div>

      {/* Notice Preview Section */}
      <div className="mt-12 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-blue-800 mb-6 text-center">Today's Notices</h2>
        <div className="bg-white shadow-lg rounded-xl p-6 border border-blue-200">
          {notice ? (
            <p className="text-gray-800 text-base sm:text-lg lg:text-xl font-medium leading-relaxed">
              {notice}
            </p>
          ) : (
            <p className="text-gray-500 italic text-center">No notice posted yet.</p>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-16 text-center text-xs sm:text-sm lg:text-base text-blue-700">
        &copy; {new Date().getFullYear()} Hostel Hub. All rights reserved.
      </footer>
    </div>
  );
};

export default NoticeBoard;
