import React from 'react'
import {set, useForm} from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { api } from '/src/components/api/api.js';

import toast from 'react-hot-toast';
const Login= () => {
    const {register, handleSubmit, formState:{errors}}=useForm();
   
    const navigate=useNavigate();
     const onSubmit = async(data) => {
      try{
      await api.post("/users/login", data);
      navigate('/');
      window.location.reload();

      toast.success("User Logged in Successfully")
     
          console.log("Form submitted:", data);
     navigate('/'); // optional redirect
      } catch(err){
        toast.success("User not exists")
      }

  };
  return (
    <>
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>
  <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200'>
<h2 className="text-2xl font-bold text-center mb-6">Login</h2>
   
         <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Enter email address
            </label>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && <p className="text-red-500 mb-2">{errors.email.message}</p>}
         <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
             Enter Password
            </label>
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required", minLength: 6 })}
          className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.password && <p className="text-red-500 mb-2">{errors.password.message}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition mb-2"
        >
          Login
        </button>
        {/* <div className='flex justify-between text-gray-600'>
           <a className='left-0'>Forget Password?</a>
           <a className=' right-0'><Link to="/signup">Sign Up</Link>  </a>
        </div> */}
        <div className="flex justify-between text-gray-600 text-sm mt-3">
  <a href="#" className="hover:underline">
    Forgot Password?
  </a>
  <Link to="/signup" className="hover:underline text-blue-500">
    Sign Up
  </Link>
  </div>
<p className="text-center text-gray-500 mt-2">
  or you can sign in with
</p>
<div className='flex justify-center text-gray-600 text-2xl space-x-4 mt-2'>
    <i class="fa-brands fa-google"></i><i class="fa-brands fa-facebook"></i>
<i class="fa-brands fa-github"></i>
</div>
  </form>
    </div>
    </>
  )
}

export default Login;

