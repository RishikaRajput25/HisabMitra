/*
import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { getMonthlyData } from './dashLogic/MonthlyData';
//import MonthSelector from './MonthSelector';

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#556270",
  "#C7F464",
  "#FFB347",
  "#A6E1FA",
  "#D291BC",
  "#FF8C94",
];

const Expense_Chart = ({ expenses, selectedMonth , setSelectedMonth}) => {
 const data = getMonthlyData(expenses, selectedMonth);
// console.log("RAW EXPENSES:", expenses);
// console.log("SELECTED MONTH:", selectedMonth);
// console.log(
//   "FILTERED:", 
//   expenses.filter(e => new Date(e.date).getMonth() === selectedMonth)
// );

// totals array ke first object se lo
const totalExpense = data[0]?.TotalExpense || 0;
const receivedAmount = data[0]?.RecievedAmount || 0;
const MonthName=["January", "Febrary", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
// const n= MonthName.length();
// let i=0;
// while(i<=selectedMonth){
//     if(i==)
// }
  
const Month= MonthName[selectedMonth];
  if (!data.length) return <div>
    <div>
     <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(Number(e.target.value))}
        className="border p-2 rounded-lg"
      >
        {MonthName.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select></div>
      <p className='mt-5 items-center'>
    No expenses for this month</p></div>;

  return (
    <div className="w-1/2 bg-white p-4 shadow-xl rounded-xl">
 
      <h2 className="font-bold text-lg mb-2">Category-wise Expense</h2>
      

<div className="mb-4">
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(Number(e.target.value))}
        className="border p-2 rounded-lg"
      >
        {MonthName.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
    </div>


      <h2> Expense Month: {Month}</h2>

      <PieChart width={350} height={350}>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
      <div className=' mt-2'>
         Debit Amount this Month : <h className='text-blue-500'>{totalExpense}</h>
         <br></br>
         Credit Amount this Month : <h className='text-blue-500'>{receivedAmount}</h>
      </div>
     
    </div>
  )
}

export default Expense_Chart

*/
import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getMonthlyData } from './dashLogic/MonthlyData';

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#556270",
  "#C7F464",
  "#FFB347",
  "#A6E1FA",
  "#D291BC",
  "#FF8C94",
];

const Expense_Chart = ({ expenses, selectedMonth , setSelectedMonth }) => {
  const data = getMonthlyData(expenses, selectedMonth);

  const totalExpense = data[0]?.TotalExpense || 0;
  const receivedAmount = data[0]?.RecievedAmount || 0;

  const MonthName = [
    "January", "Febrary", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const Month = MonthName[selectedMonth];

  if (!data.length) {
    return (
      <div className="w-full bg-white p-4 shadow-xl rounded-xl">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="border p-2 rounded-lg w-full sm:w-auto"
        >
          {MonthName.map((month, index) => (
            <option key={index} value={index}>{month}</option>
          ))}
        </select>

        <p className="mt-5 text-center text-gray-500">
          No expenses for this month
        </p>
      </div>
    );
  }

  return (

  <div className="w-full bg-white p-4 sm:p-6 shadow-xl rounded-xl">
  
  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
    <h2 className="font-bold text-xl text-center sm:text-left">
      Category-wise Expense
    </h2>

    <select
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(Number(e.target.value))}
      className="border p-2 rounded-lg w-full sm:w-40"
    >
      {MonthName.map((month, index) => (
        <option key={index} value={index}>{month}</option>
      ))}
    </select>
  </div>

  <p className="text-center sm:text-left mb-2 text-sm text-gray-600">
    Expense Month: <span className="font-semibold">{Month}</span>
  </p>

  {/* Chart */}
  <div className="w-full h-[260px] sm:h-[320px]">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius="75%"
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* Totals */}
  <div className="mt-4 text-sm flex flex-col sm:flex-row sm:justify-between gap-2">
    <p>
      Debit: <span className="text-red-500 font-semibold"><i class="fa-solid fa-indian-rupee-sign"></i>{totalExpense}</span>
    </p>
    <p>
      Credit: <span className="text-green-500 font-semibold"><i class="fa-solid fa-indian-rupee-sign"></i>{receivedAmount}</span>
    </p>
  </div>
</div>

  )
}

export default Expense_Chart;
