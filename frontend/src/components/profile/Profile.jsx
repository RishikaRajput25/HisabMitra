
import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import Clusters from "../Khatabook/Clusters.jsx";
import toast from "react-hot-toast";
import { api } from "../api/api.js";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
const Profile = () => {
  const [openModal, setOpenModal] = useState(false);
const [username, setUsername] = useState("");
  const navigate= useNavigate();
  const { user, setUser } = useAuth();

const handleLogout=async()=>{
   const res = await api.post('/users/logout');
  
    navigate('/')
  
   console.log("Logout Responce :", res)
 toast.success("User logout Successfully !")
};
useEffect(()=>{
  setUsername(user?.username)
},[openModal])
const handleUpdate = async () => {

  if (!username.trim()) {
    toast.error("Username required");
    return;
  }

  try {

   const res= await api.post('/users/edit-username', { username });
 // navigate(`/profile`);
  setUser(res.data.data); 
    toast.success("Username Successfully updated !");
    setOpenModal(false);

  } catch (error) {
    console.log(error);
  }
};

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
            <button 
            onClick={() => setOpenModal(true)}
            className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Edit
            </button>
            <Link
              onClick={()=>handleLogout()}
              className="flex-1 py-2 text-center bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE – KHATABOOK (70–75%) */}
        <div className="w-full md:w-[70%] bg-white rounded-2xl shadow-md p-6">

          <div className="flex justify-between  border-b pb-3">
            <h1 className="text-xl font-semibold text-gray-800">
              Your KhataBook
            </h1>
            <Link
              to="/createCluster"
              className="h-8 w-8 flex pb-1 justify-center items-center bg-blue-500 text-white rounded-lg text-2xl"
            >
             +
            </Link>
          </div>

          <p className="text-gray-500 text-sm mt-2">
            Create Khatabook and manage records of particular persons.
          </p>

         
            <Clusters/>
          
        </div>

      </div>

      {openModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
    
    <div className="bg-white p-6 rounded-xl shadow-xl w-80">
      
      <h2 className="text-lg font-semibold mb-4">Edit Username</h2>

      <input
        type="text"
        placeholder="Enter new username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border p-2 rounded-lg mb-4"
      />

      <div className="flex gap-3">

        <button
          onClick={() => setOpenModal(false)}
          className="flex-1 py-2 bg-gray-300 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdate}
          className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Edit
        </button>

      </div>

    </div>

  </div>
)}

    </div>
  );
};

export default Profile;
