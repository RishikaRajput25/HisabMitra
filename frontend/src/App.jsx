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
import ProtectedRoute from './components/common/ProtectedRoute';
import NotFound from './components/common/NotFound';
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
      element:(
        <ProtectedRoute>
      <><Navbar/>
      <Profile/>
      <Footer/>
      </>
      </ProtectedRoute>
      )
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
      element:(
        <ProtectedRoute>
      <><Navbar/><AddExpense/></>
      </ProtectedRoute>
    )
    },
    {
      path:"/editExpense/:id",
      element:(
        <ProtectedRoute>
      <>
      <Navbar/>
      <EditExpense/>
      </>
      </ProtectedRoute>
      )
    },
    {
      path:"/createCluster",
      element:(
        <ProtectedRoute>
      <><Navbar/><CreateCluster/></>
      </ProtectedRoute>
      )
    },
    {
      path:"/clusters/:clusterId/records",
      element:<ProtectedRoute><Navbar/><Records/></ProtectedRoute>
    },
    {
      path:"/clusters/:clusterId/records/create",
      element:<ProtectedRoute><Navbar/><CreateRecords/></ProtectedRoute>
    },
    {
      path:"*",
      element:<><NotFound/></>
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
