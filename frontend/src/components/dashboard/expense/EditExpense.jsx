// import React from 'react'
// import { useParams,useNavigate } from 'react-router-dom'
// import { useState, useEffect } from 'react';
// import { api } from '../../api/api';
// import toast from 'react-hot-toast';
//  import { useForm } from 'react-hook-form';
// const EditExpense = () => {
//   const { register, handleSubmit, reset, formState: { errors } } = useForm();
//   const {id}= useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData]=useState({
//     title : "",
//     amount:"",
//     type:"",
//     date:"",
//     discription:""
//   });
//   useEffect(()=>{
//     const fetchExpenseData= async()=>{
//       const res = await api.get(`/expenses/${id}`);
//       setFormData(res.data);
//     };
//     fetchExpenseData();
//   },[id]);

//   const onSubmit= async(data)=>{
// //  e.preventDefault();
//  await api.put(`/expenses/${id}`,formData);
//  toast.success("Expense updated successfully");
//  navigate(-1);
//   }
  
//   return (
//     <>
//     <div className="flex justify-center items-center min-h-[80vh] px-4 mt-5">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-md bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200"
//       >
//         {/* Heading */}
//         <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
//          Update Expense
//         </h2>

//         {/* Title */}
//         <div className="mb-4">
//           <label className="block mb-2 font-semibold text-gray-700">Item Name</label>
//           <input
//             type="text"
            
//             {...register("title", { required: "Item Name is required" }
              
//             )}

//             placeholder="e.g. Grocery Shopping"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           {errors.item && (
//             <p className="text-red-500 text-sm mt-1">{errors.item.message}</p>
//           )}
//         </div>

//         {/* Amount */}
//         <div className="mb-4">
//           <label className="block mb-2 font-semibold text-gray-700">Amount</label>
//           <input
//             type="number"
            
//             {...register("amount", { required: "Amount is required", min: 1 })}
//             placeholder="₹ Amount"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           {errors.amount && (
//             <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
//           )}
//         </div>
//           {/* Description */}
      
//           <div className="mb-4">
//           <label className="block mb-2 font-semibold text-gray-700">Description</label>
//           <input
//             type="text"
//             value={formData.discription}
//             {...register("description", {required: "Amount is required",   min: 1 })}
//             placeholder="Where did you spend and why"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           {errors.amount && (
//             <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
//           )}
//         </div>
//         {/* Date */}
//         <div className="mb-4">
//           <label className="block mb-2 font-semibold text-gray-700">Date</label>
//           <input
//             type="date"
//             value={formData.date}
//             {...register("date", { required: "Date is required" })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           {errors.date && (
//             <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
//           )}
//         </div>

//         {/* Category */}
//         <div className="mb-6">
//           <label className="block mb-2 font-semibold text-gray-700">Category</label>
//           <select
//           value={formData.category}
//             {...register("category", { required: "Category is required" })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           >
//             <option value="">Select category</option>
//             <option value="Food"> Food</option>
//             <option value="Transportation"> Transportation</option>
//             <option value="Bills & Utilities">Bills & Utilities</option>
//             <option value="Health & Wellness">Health & Wellness</option>
//             <option value="Entertainment">Entertainment</option>
//             <option value="Shopping"> Shopping</option>
//             <option value="Home & Livings">Home & Livings</option>
//             <option value="Other"> Other</option>
//           </select>
//           {errors.category && (
//             <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
//           )}
//         </div>
       
//     {/* Type */}
// <div className="mb-4">
//   <label className="block mb-2 font-semibold text-gray-700">Type</label>
//   <select
//   value={formData.type}
//     {...register("type", { required: "Type is required" })}
//     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//   >
//     <option value="">Select Type</option>
//     <option value="Paid">Paid</option>
//     <option value="Received">Received</option>
//   </select>
//   {errors.type && (
//     <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
//   )}
// </div>


//         {/* Buttons */}
//         <div className="flex justify-between items-center gap-4">
//           {/* Back Button */}
//           <button
//             type="button"
//             onClick={() => navigate("/dashboard")}
//             className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-lg shadow transition"
//           >
//             ⬅ Back
//           </button>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg shadow transition"
//           >
//            Edit Expense
//           </button>
//         </div>
//       </form>
//     </div>
//     </>
//   )
// }

// export default EditExpense


import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { api } from "../../api/api";
import toast from "react-hot-toast";

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 🔹 Fetch expense & prefill form
  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const res = await api.get(`/expenses/${id}`);
        reset(res.data.data); 
      
      } catch (error) {
        toast.error("Failed to load expense");
      }
    };

    fetchExpenseData();
  }, [id, reset]);

  // 🔹 Submit updated data
  const onSubmit = async (data) => {
    try {
      await api.put(`/expenses/${id}`, data);
      toast.success("Expense updated successfully");
      navigate(-1);
    } catch (error) {
      toast.error("Failed to update expense");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4 mt-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200"
      >
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Update Expense
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            Item Name
          </label>
          <input
            type="text"
            {...register("title", { required: "Item Name is required" })}
            placeholder="e.g. Grocery Shopping"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            Amount
          </label>
          <input
            type="number"
            {...register("amount", {
              required: "Amount is required",
              min: { value: 1, message: "Amount must be greater than 0" },
            })}
            placeholder="₹ Amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">
              {errors.amount.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            Description
          </label>
          <input
            type="text"
            {...register("description")}
            placeholder="Where did you spend and why"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            Date
          </label>
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">
              {errors.date.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            Category
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Bills & Utilities">Bills & Utilities</option>
            <option value="Health & Wellness">Health & Wellness</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Home & Livings">Home & Livings</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Type */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">
            Type
          </label>
          <select
            {...register("type", { required: "Type is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select Type</option>
            <option value="Paid">Paid</option>
            <option value="Received">Received</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">
              {errors.type.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-lg"
          >
            ⬅ Back
          </button>

          <button
            type="submit"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg"
          >
            Edit Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditExpense;
