import React from 'react'
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkLoginStatus,logoutUser,api } from '../api/api';
import axios from 'axios';

const Navbar = () => {
    const navigate=useNavigate();
const [user, setUserPresence]=useState(false);
const [isOpen, setIsOpen]=useState(false);
const [showProfile, setShowProfile] = useState(false);
//const [data, setData]=useState('');
useEffect(() => {
  const checkStatus = async () => {
    try {
      const result = await checkLoginStatus();
      if (result?.success) {
        setUserPresence(true);
      } else {
        setUserPresence(false);
      }
    } catch (err) {
      setUserPresence(false); // important
    }
  };
  checkStatus();
  
}, []);  // NO RECURSION
// useEffect(()=>{
// const fetchUser= async()=>{
//   try{
//   const responce = await axios.get('http://localhost:3000/api/v1/users/me')
//   setData(responce);
// console.log(data.username);
// }catch(err){
//     console.log(err);
//   }
// }
// },[])
const handleLogout=async()=>{
   const res = await logoutUser();
  if (res?.success) {
    setUserPresence(false);
    navigate("/");
  }
  
};
  return (
   <nav className='bg-blue-400 text-white shadow-md'>
    <div className='container mx-auto flex justify-between items-center px-4 h-14'>
        {/* Left Logo */}
  <div className='text-2xl font-bold'>
    <Link to="/">HisabMitra</Link>
  </div>
  {/* Right DashBoard */}
<div className='flex items-center gap-6 font-semibold'>
<Link to="/dashboard" className='hover:text-gray-100'>Dashboard</Link>
<div className={` md:flex gap-6 ${showProfile ? "lg:w-1/2" : "w-full"} `}>
    {user ? (
       <>   
<button className={`hover:text-gray-100`  } onClick={handleLogout}>Logout</button>
<Link to="/profile"  onClick={() => setShowProfile(true)} className='hover:text-gray-100 hidden sm:block  '> <i className="fa-solid text-2xl fa-circle-user"></i></Link>
</>
):(
  <>
   <Link to="/signup"  onClick={() => setShowProfile(true)}className='hover:text-gray-100 hidden sm:block'>SignUp </Link>
    <h1 className='hover:text-gray-100 mx-0 hidden sm:block'>or</h1>
   <Link to="/login"  onClick={() => setShowProfile(true)}className='hover:text-gray-100 hidden sm:block'>Login</Link>
   </>
    )}
   
</div>



  {/* MOBILE HAMBURGER FOR SIGNUP / LOGIN only */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        )}
      </button>
    </div>
    </div>
{/* MOBILE DROPDOWN ONLY FOR SIGNUP/LOGIN */}
  {isOpen && (
    <div className="md:hidden flex flex-col space-y-2 px-4 pb-3 font-semibold">
      {user ? (
        <>
        <Link to="/profile">Profile</Link>
        <Link  onClick={handleLogout} className="hover:text-gray-100">Logout</Link>
        </>):(
          <>
      <Link to="/signup" onClick={() => setIsOpen(false)}>SignUp</Link>
      <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
      </>)
     }
    </div>
  )}
   </nav>
  )
}

export default Navbar

