import React from "react";

function StuComplaints() {
  return (
    <main className="max-w-7xl px-6 py-3">
      <div className="bg-gray-800 rounded-lg shadow-md p-6 max-w-3xl">
        <h3 className="text-xl font-semibold text-white mb-2">
          Switch is not working
        </h3>
        <p className="text-sm text-gray-400 mb-1">Created on Dec 15, 2023</p>
        <p className="text-sm text-gray-400 mb-4">
          Completed on Dec 15, 2023, 1:49:02 PM
        </p>
        <p className="text-gray-300 mb-4">
          I am facing issues with the switch in my room. It is not functioning
          correctly. I will be there after 1:30PM.
        </p>
        <span className="inline-block px-3 py-1 bg-green-600 text-white text-sm rounded-full">
          Completed
        </span>
        
      </div>
    </main>
  );
}

export default StuComplaints;
