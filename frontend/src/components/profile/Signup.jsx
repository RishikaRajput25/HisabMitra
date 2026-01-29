import React from 'react'
import {useForm} from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {api} from '/src/components/api/api.js';
import toast from 'react-hot-toast';
const Signup = () => {
 
    const {register, handleSubmit, formState:{errors}}=useForm();
    const navigate=useNavigate();
     const onSubmit = async(data) => {
      
      await api.post("/users/register", data);
        toast.success("User registered Successfully")
    console.log("Form submitted:", data);
    navigate('/login'); // optional redirect
    

  };
  return (
    <>
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>
  <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200'>
<h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
   <label htmlFor='username' className='block text-gray-700 font-medium mb-1'>Enter Username</label>
   <input
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.username && <p className="text-red-500 mb-2">{errors.username.message}</p>}
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
          Signup
        </button>
        <a className="block text-center mt-3 no-underline text-gray-500">
  Have an account?{" "}
  <Link
    className="text-blue-500 font-sans hover:underline"
    to="/login"
  >
    Sign in
  </Link>
</a>
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

export default Signup;

