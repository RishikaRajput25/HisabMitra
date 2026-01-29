// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// const Weekly_Graph = ({ expenses }) => {
//   // Week days in correct order
//   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   // Initialize array with 0 values for all 7 days
//   const weeklyData = days.map((day) => ({
//     day,
//     amount: 0,
//   }));

//   // MAIN LOGIC → Calculate expense of each week day
//   expenses.forEach((item) => {
//     const date = new Date(item.date); // Convert to JS Date
//     const dayIndex = date.getDay();   // Sun=0 ... Sat=6

//     weeklyData[dayIndex].amount += Number(item.amount); // Add amount to correct day
//   });

//   return (
//     <div className="w-full bg-white p-4 rounded-xl shadow-md mt-3">
//       <h2 className="text-center font-semibold text-lg mb-2">
//         Weekly Expense Overview
//       </h2>

//       <div className="w-full h-[300px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={weeklyData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="day" />
//             <YAxis />
//             <Tooltip />
//             <Bar
//               dataKey="amount"
//               fill="#4F46E5"
//               radius={[6, 6, 0, 0]} // Rounded top bars
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default Weekly_Graph;

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Weekly_Graph = ({ expenses }) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // ---------------------------
  // TRACK WHICH WEEK USER IS VIEWING
  // currentWeekOffset = 0 → THIS WEEK
  // -1 → PREVIOUS WEEK
  // +1 → NEXT WEEK
  // ---------------------------
  const [weekOffset, setWeekOffset] = useState(0);
   
  // Function → get start (Sun) & end (Sat) of selected week
  const getWeekRange = (offset) => {
    const curr = new Date();

    // Move weeks → offset * 7 days
    curr.setDate(curr.getDate() + offset * 7);

    // Find Sunday
    const first = new Date(curr);
    first.setDate(first.getDate() - first.getDay());

    // Find Saturday
    const last = new Date(first);
    last.setDate(last.getDate() + 6);

    return { start: first, end: last };
  };

  const { start, end } = getWeekRange(weekOffset);

  // ---------------------------
  // FILTER EXPENSES FOR THIS WEEK ONLY
  // ---------------------------
  const filtered = expenses.filter((item) => {
    const d = new Date(item.date);
    return d >= start && d <= end;
  });

  // ---------------------------
  // CALCULATE WEEKLY AMOUNTS
  // ---------------------------
  const weeklyData = days.map((day) => ({ day, amount: 0 }));

  filtered.forEach((item) => {
    const d = new Date(item.date);
    const index = d.getDay(); // Sun=0 ... Sat=6
    weeklyData[index].amount += Number(item.amount);
      
      
  });

const TotalWeeklyExpense= filtered
.filter(item => item.type === "Paid")
.reduce((sum,item)=> sum + Number(item.amount),0);
const totalWeeklyReceived = filtered
  .filter(item => item.type === "Received")
  .reduce((sum, item) => sum + Number(item.amount), 0);
  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-lg">

      {/* HEADER + BUTTONS */}
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setWeekOffset(weekOffset - 1)}
          className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          ← Previous Week
        </button>

        <h2 className="font-semibold text-lg">
          Week: {start.toLocaleDateString()} → {end.toLocaleDateString()}
        </h2>

        <button
          onClick={() => setWeekOffset(weekOffset + 1)}
          className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Next Week →
        </button>
      </div>

      {/* RESET BUTTON TO CURRENT WEEK */}
      <div className="text-center mb-3">
        <button
          onClick={() => setWeekOffset(0)}
          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go to Current Week
        </button>
      </div>

      {/* BAR CHART */}
      <div className="w-full h-[300px]  sm:h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="amount"
              fill="#4F46E5"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        {/* <div className="mt-1 flex justify-between">
        <h className="mt-1 font-light ">Total Weekly Expense : {TotalWeeklyExpense}</h>
        <h className="mt-1 font-light ">Total Weekly Income : {totalWeeklyReceived}</h>
        </div> */}
        
      </div>
      <div className="mt-4">
        Total Weekly Expense :<h className=" text-blue-500">{TotalWeeklyExpense}</h> 
        <br></br>
        Total Weekly Income : <h className=" text-blue-500">{totalWeeklyReceived}</h>
        </div>
    </div>
  );
};

export default Weekly_Graph;
