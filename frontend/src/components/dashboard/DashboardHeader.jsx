
import { Link } from 'react-router-dom'
import { useAuth } from "../context/AuthContext.jsx";
const DashboardHeader = () => {
  const {user}= useAuth();
  return (
    <>
    <div className="flex justify-between items-center mb-6">
      <div>
        <div className="text-sm text-gray-500">Welcome back,</div>
        <div className="text-2xl font-bold">{user.username}</div>
      </div>
      <div className="flex items-center gap-3 ">
        <button className="px-3 py-2 border rounded shhadow-sm hover:shadow-lg transition-opacity   "><Link to="/addExpense"> + Add Expense</Link></button>
        {/* <button className="px-3 py-2 rounded bg-white  shadow-sm border hover:shadow-lg transition-opacity  ">Logout</button> */}
      </div>
    </div>
    <hr></hr>
    </>
  )
}

export default DashboardHeader
