import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const user= useAuth();
 const navigate= useNavigate();
  const handleNavigate = ()=>{
   
    if(user){
      navigate('/dashboard');
    }else{
      navigate('/signup');
    }
    // navigate('/signup');
     window.reload(); 
  }

  return (
    <div className='min-h-screen font-sans'>
    
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-16 md:px-20">
        <div className="md:w-1/2 space-y-5">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            We <span className="text-blue-500">Guarantee</span> The Worthiness Of Every{" "}
            <span className="text-blue-500">Money</span> Transaction.
          </h2>
          <p className="text-gray-700">
            Manage your daily expenses, track your savings, and grow your wealth smartly
            with <span className="font-semibold text-gray-900">HisabMitra</span> <i class="fa-solid fa-minus"></i> your
            personal expense tracker.
          </p>
          <div className="flex space-x-4 mt-5">
            <button onClick={()=>handleNavigate()} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            
             Get Started
            </button>
           
          </div>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="/Expense2.jpg"
            alt="Hero Illustration"
            className="w-3/4"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="text-center py-20 bg-white rounded-t-3xl shadow-inner">
        <h3 className="text-blue-500 font-semibold mb-3">How It Works</h3>
        <h2 className="text-3xl font-bold mb-10">Add Your All Daily Expenses</h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-10 md:px-20">
          {/* Card 1 */}
          <div className="p-8 bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300 text-gray-800 rounded-2xl shadow-lg w-72 cursor-pointer">
            <h4 className="text-xl font-semibold mb-2">Create Account</h4>
            <p>Sign up to start tracking and managing all your financial activities easily.</p>
          </div>

          {/* Card 2 */}
          <div className="p-8 bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300 text-gray-800 rounded-2xl shadow-lg w-72 cursor-pointer">
            <h4 className="text-xl font-semibold mb-2">Add Daily Expenses</h4>
          
            <p>Add and Track  your weekly and monthly expenses through a centralized
dashboard for better financial visibility.</p>
          </div>

          {/* Card 3 */}
          <div className="p-8 bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300 text-gray-800 rounded-2xl shadow-lg w-72 cursor-pointer">
            <h4 className="text-xl font-semibold mb-2">Create Budget</h4>
            <p>Enable person-based expense tracking by creating dedicated khata books
            with structured transaction records.</p>
          </div>
        </div>
      </section>



    </div>
  )
}

export default Home
