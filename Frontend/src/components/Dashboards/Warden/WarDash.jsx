import React from 'react';

function WarDash() {
  return (
    <div className="bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-xl font-normal">SJCE Boy's Hostel</h1>
          <div className="flex items-center space-x-6">
            <span className="text-gray-600">Account</span>
            <button className="text-blue-500 hover:text-blue-600 px-4 py-1 border border-blue-500 rounded">Logout</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-normal text-black mb-6">Complaints</h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Complaints will be listed here */}
        </div>
      </main>
    </div>
  );
}

export default WarDash;
