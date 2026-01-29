// import React from "react";

// const ListingTable = ({ expenses }) => {
//   // safeguard
//   if (!Array.isArray(expenses)) {
//     console.log("Expenses is not an array:", expenses);
//     return <p>No expenses available.</p>;
//   }

//   return (
//     <div className="bg-white p-4 rounded-xl shadow">
//       <table className="w-full text-left">
//         <thead>
//           <tr className="border-b">
//             <th className="p-2">Title</th>
//             <th className="p-2">Category</th>
//             <th className="p-2">Amount</th>
//             <th className="p-2">Date</th>
//           </tr>
//         </thead>

//         <tbody>
//           {expenses.length > 0 ? (
//             expenses.map((item) => (
//               <tr key={item._id || item.id} className="border-b hover:bg-gray-50">
//                 <td className="p-2">{item.title}</td>
//                 <td className="p-2">{item.category}</td>
//                 <td className="p-2 font-semibold">₹{item.amount}</td>
//                 <td className="p-2">
//                   {item.date
//                     ? new Date(item.date).toLocaleDateString()
//                     : "—"}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" className="p-4 text-center text-gray-500">
//                 No records found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ListingTable;

import React from "react";
import { api,fetchExpenses } from "../api/api";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ListingCards = ({ expenses ,fetchExpenses,setExpenses}) => {
  const navigate= useNavigate();
  if (!Array.isArray(expenses)) {
    return <p>No expenses to show</p>;
  }
// const handleDelete= async(_id)=>{
//    try {
//       await api.delete(`/expenses/${_id}`);
//       fetchExpenses(); // refresh list
//  toast.success("Expense successfully deleted");
//     } catch (error) {
//       console.log("Delete failed:", error);
//     }
// }

const handleDelete = async (_id) => {
  try {
    await api.delete(`/expenses/${_id}`);

   
    setExpenses(prevExpenses =>
      prevExpenses.filter(exp => exp._id !== _id)
    );

    toast.success("Expense successfully deleted");
  } catch (error) {
    console.log("Delete failed:", error);
  }
};

// const handleUpdate = async(_id)=>{
//   try{
//  navigate(`/editExpense/${_id}`);

//   }
//   catch(err){
//  console.log("Error :",err);
//   }
// }
  return (
    <div className="space-y-2   grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-4 ">
      {expenses.map((item) => (
        <div
          key={item._id}
          className="flex justify-between items-start bg-white p-4 rounded-xl shadow-sm border hover:shadow-lg transition-opacity "
        >
          {/* LEFT SECTION */}
          <div>
            <h2 className="text-lg font-bold">{item.title}</h2>

            <p className="text-gray-500 text-sm">{item.category}</p>
            <p className="text-gray-500 text-sm">{item.description}</p>
            <p className="text-gray-400 text-xs mt-1">
              {new Date(item.date).toLocaleString()}
            </p>

            <div className="flex gap-4 mt-2 text-sm text-blue-500 font-medium">
              <button className="hover:underline" onClick={()=>navigate(`/editExpense/${item._id}`)}>Edit</button>
              <button className="hover:underline text-red-500" onClick={ ()=>handleDelete(item._id)}>Delete</button>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col items-end">
            <p
              className={`text-lg font-bold ${
                item.type === "income" ? "text-green-600" : "text-red-600"
              }`}
            >
              ₹{item.amount.toLocaleString()}
            </p>

            <p className="text-gray-500 text-xs">
              {item.type === "income" ? "Income" : "Expense"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListingCards;
