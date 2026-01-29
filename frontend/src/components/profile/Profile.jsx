



import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import Clusters from "../Khatabook/Clusters.jsx";
const Profile = () => {
  const { user } = useAuth();
  if (!user) return <h2 className="text-center mt-10">Please Login</h2>;

  return (
    <div className="min-h-screen p-4">
      
      {/* Main Layout */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-2">

        {/* LEFT SIDE – PROFILE (25–30%) */}
        <div className="w-full md:w-[30%] bg-white rounded-2xl shadow-md p-6">
          
          <div className="flex flex-col items-center border-b pb-4">
            <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center text-4xl">
              <i class="fa-solid fa-circle-user"></i>
            </div>
            <h2 className="mt-3 text-lg font-semibold">
              @{user.username}
            </h2>
          </div>

          <div className="mt-4 space-y-2 text-gray-700">
            <p><span className="font-medium">Full Name:</span> {user.username}</p>
            <p><span className="font-medium">Email:</span> {user.email}</p>
          </div>

          <div className="flex gap-3 mt-6">
            <button className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Edit
            </button>
            <Link
              to="/logout"
              className="flex-1 py-2 text-center bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE – KHATABOOK (70–75%) */}
        <div className="w-full md:w-[70%] bg-white rounded-2xl shadow-md p-6">

          <div className="flex justify-between items-center border-b pb-3">
            <h1 className="text-xl font-semibold text-gray-800">
              Your KhataBook
            </h1>
            <Link
              to="/createCluster"
              className="h-8 w-8 flex items-center justify-center bg-blue-500 text-white rounded-lg text-2xl"
            >
             +
            </Link>
          </div>

          <p className="text-gray-500 text-sm mt-2">
            Create Khatabook and manage records of particular persons.
          </p>

          {/* CLUSTER LIST / RECORDS */}
          {/* <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex justify-between"> */}
            <Clusters/>
            {/* Example Card 
            <div className="border rounded-xl p-4 hover:shadow-md transition">
              <h3 className="font-semibold text-gray-800">Rahul Traders</h3>
              <p className="text-sm text-gray-500">Total Records: 12</p>
            </div>

            <div className="border rounded-xl p-4 hover:shadow-md transition">
              <h3 className="font-semibold text-gray-800">Amit Stores</h3>
              <p className="text-sm text-gray-500">Total Records: 8</p>
            </div>*/}

          {/* </div> */}
        </div>

      </div>
    </div>
  );
};

export default Profile;
