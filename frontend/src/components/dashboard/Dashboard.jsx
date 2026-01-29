
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { Link } from "react-router-dom";

// const Dashboard = () => {
//   const [hasExpenses, setHasExpenses] = useState(false);
//   const { user } = useAuth();

//   return (
//     <>
//       {user ? (
//         <div className="min-h-screen bg-gray-50 p-6">
//           {/* Header */}
//           <div className=" text-black p-5 rounded-2xl shadow-md mb-6">
//             {/* <h1 className="text-2xl font-bold">Dashboard</h1> */}
//             <p className="font-medium text-2xl text-black">Welcome back, {user.username} 👋</p>
//           </div>

//           {/* Expense Section */}
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <h2 className="text-xl font-semibold mb-3">Your Expenses</h2>

//             {hasExpenses ? (
//               <p className="text-gray-700">This is your Expense List</p>
//             ) : (
//               <div className="text-center py-10">
//                 <p className="text-gray-600 mb-4">
//                   You don’t have any expenses yet.
//                 </p>
//                 <button className="px-5 py-2 bg-blue-500 text-white rounded-lg bg-blue-500 hover:bg-blue-600 transition shadow ">
//                   + Create Expense
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       ) : (
//         // NOT LOGGED IN UI
//         <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-100">
//           <h1 className="text-3xl font-bold text-gray-800 mb-5">
//             Not Logged In
//           </h1>

//           <div className="flex gap-4">
//             <Link to="/signup">
//               <button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
//                 Signup
//               </button>
//             </Link>

//             <Link to="/login">
//               <button className="px-6 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-900 transition">
//                 Login
//               </button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Dashboard;



import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import ListingCards from "./ListingCards";
import { fetchExpenses } from "../api/api";
import Expense_Chart from "./Expense_Chart";
import Weekly_Graph from "./Weekly_Graph";
import FilterBar from "./expense/FilterBar";
import ExpenseListSection from "./expense/ExpenseListSection";
const Dashboard = () => {
  const [hasExpenses, setHasExpenses] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const { user } = useAuth();
//ttable start


const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
//For Filtering toggle and category search 
const [filterType, setFilterType] = useState("all");
const [selectedCategory, setSelectedCategory] = useState("");



  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchExpenses();
        console.log("API RESPONSE:", res);

        // 🔥 Backend ka actual structure handle kiya hai:
        // expected: { success: true, data: { expenses: [...] } }

        const realData =
          res?.data?.data?.expenses || res?.data?.expenses || [];

        setExpenses(realData);
      } catch (error) {
        console.log("Error loading expenses:", error);
        setExpenses([]);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);
useEffect(()=>{
  if(expenses && expenses.length>0){
    setHasExpenses(true);
  }
},[expenses]);

// const selectedMonth =
//   expenses.length > 0
//     ? new Date(expenses[0].date).getMonth()
//     : new Date().getMonth();

  if (loading) return <p className="p-4">Loading...</p>;

  //Filter Code  start

  let filteredExpenses = expenses;

// month filter
filteredExpenses = filteredExpenses.filter(
  item => new Date(item.date).getMonth() === selectedMonth
);

// toggle
if (filterType !== "all") {
  filteredExpenses = filteredExpenses.filter(
    item => item.type.toLowerCase() === filterType
  );
}

// category
if (selectedCategory) {
  filteredExpenses = filteredExpenses.filter(
    item =>
      item.category.toLowerCase().includes(
        selectedCategory.toLowerCase()
      )
  );
}
//filter code end




 
  return (
    <>
      {user ? (


        <div className="min-h-screen  p-6">
        

            <DashboardHeader/>
           
        <div className=" p-4 rounded-xl ">
            {hasExpenses ? (
              <>
             
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* <div className="flex justify-between space-x-4"> */}
              <Expense_Chart expenses={expenses} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
              <Weekly_Graph expenses={expenses}/>
              </div>


              <FilterBar
    filterType={filterType}
    setFilterType={setFilterType}
    selectedCategory={selectedCategory}
    setSelectedCategory={setSelectedCategory}
  />


              <p className="text-gray-700 text-center items-center mt-4">This is your Expense List</p> 


               {/* <ListingCards expenses={expenses}/> */}
               <ListingCards expenses={filteredExpenses} setExpenses={setExpenses}/>

            </>

            ) : (
              <div className="text-center items-center py-2">
                <p className="text-gray-600 mb-4">
                  You don’t have any expenses yet.
                </p>
                
              </div>
            )}
          </div>
        </div>





      ) : (
        // NOT LOGGED IN UI
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-5">
            Not Logged In
          </h1>

          <div className="flex gap-4">
            <Link to="/signup">
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                Signup
              </button>
            </Link>

            <Link to="/login">
              <button className="px-6 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-900 transition">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
