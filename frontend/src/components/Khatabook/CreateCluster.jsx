import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from '../api/api';

import toast from "react-hot-toast";
const CreateCluster = () => {
   const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
  
  const onSubmit=async(data)=>{
await api.post("/clusters/create",data);
toast.success("New Khatabook Created");
console.log("Form submited:",data);
navigate('/profile');
  } 
  return (
    <>
    <div className="flex justify-center items-center min-h-[80vh] px-4 mt-5">
      <form
         onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200"
      >
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-medium text-gray-700 mb-6 text-center">
          Create new Khatbook
        </h2>
 
        {/* Title */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Name of person/buissnes</label>
          <input
            type="text"
            {...register("name", { required: " Name of person or company is required" })}
            placeholder="e.g. shubham dubey"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.item && (
            <p className="text-red-500 text-sm mt-1">{errors.item.message}</p>
          )}
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Date</label>
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        
    

        {/* Buttons */}
        <div className="flex justify-between items-center gap-4">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-lg shadow transition"
          >
             Back
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg shadow transition"
          >
            + Create
          </button>
        </div>
      </form>
    </div>
    </>
  )
}

export default CreateCluster
