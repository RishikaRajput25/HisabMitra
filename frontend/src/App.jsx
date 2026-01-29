import { useState } from 'react'
import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import Navbar from './components/common/Navbar';
import Footer from './components/common/footer';
import Signup from './components/profile/Signup';
import Login from './components/profile/Login';
import {Toaster} from "react-hot-toast";
import AddExpense from './components/dashboard/expense/AddExpense';
import EditExpense from './components/dashboard/expense/EditExpense';
import CreateCluster from './components/Khatabook/CreateCluster';
import Records from './components/Khatabook/Records';
import CreateRecords from './components/Khatabook/CreateRecords';
function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<><Navbar/><Home/><Footer/></>
    },
    {
      path:"/dashboard",
      element:<><Navbar/><Dashboard/><Footer/></>
    },
    {
      path:"/profile",
      element:<><Navbar/><Profile/><Footer/></>
    },
    {
      path:"/signup",
      element:<><Navbar/><Signup/></>
    },
    {
      path:"/login",
      element:<><Navbar/><Login/></>
    },
    {
      path:"/addExpense",
      element:<><Navbar/><AddExpense/></>
    },
    {
      path:"/editExpense/:id",
      element:<><Navbar/><EditExpense/></>
    },
    {
      path:"/createCluster",
      element:<><Navbar/><CreateCluster/></>
    },
    {
      path:"/clusters/:clusterId/records",
      element:<><Navbar/><Records/></>
    },
    {
      path:"/clusters/:clusterId/records/create",
      element:<><Navbar/><CreateRecords/></>
    }
  ])
  return (
    <>
     <Toaster />
<RouterProvider router={router}/>
     </>
  )
}

export default App
