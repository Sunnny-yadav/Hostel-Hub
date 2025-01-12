import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { useWardenComplaintContext } from "../../../Context/WardenComplaintContext";

const NoticeBoard = () => {
  const [notice, setNotice] = useState("");
  const { Fetchednotice, setFetchedNotice, Token, getLatestNoticePosted } = useWardenComplaintContext();

  useEffect(() => {
    if (Object.keys(Fetchednotice).length === 0) {
      getLatestNoticePosted();
    }
  }, [Fetchednotice])

  const handleNoticeChange = (e) => {
    setNotice(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(notice)
    try {
      const response = await fetch("http://localhost:8000/api/v1/notice/store-notice", {
        method: "POST",
        headers: {
          Authorization: Token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ notice })
      });

      const responseData = await response.json()
      console.log(responseData)
      if (response.ok) {
        setFetchedNotice(responseData.data);
        setNotice("")
      } else {
        toast.error(responseData.message)
      }

    } catch (error) {
      console.log("Error while storing notice", error)
    }
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
          {Object.keys(Fetchednotice).length > 0 ? (
            <div>
              <p className="text-blue-700 flex justify-between text-md mb-4">
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

      {/* Footer Section */}
      <footer className="mt-16 text-center text-xs sm:text-sm lg:text-base text-blue-700">
        &copy; {new Date().getFullYear()} Hostel Hub. All rights reserved.
      </footer>
    </div>
  );
};

export default NoticeBoard;
