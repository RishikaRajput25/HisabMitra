
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import ListingCards from "./ListingCards";
import { fetchExpenses } from "../api/api";
import Expense_Chart from "./Expense_Chart";
import Weekly_Graph from "./Weekly_Graph";
import FilterBar from "./expense/FilterBar";

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

        //  Backend ka actual structure handle kiya hai:
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


             
               <ListingCards expenses={filteredExpenses} setExpenses={setExpenses}/>

            </>

            ) : (
              <div className="text-center items-center py-2">
                <p className="text-gray-600 mb-4">
                  You don't have any expenses yet.
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
