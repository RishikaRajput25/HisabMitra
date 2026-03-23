
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRecordsByCLuster } from "../api/api";
import { api } from "../api/api";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
const Records = () => {
  const { clusterId } = useParams();
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getRecords = async () => {
      try {
        setLoading(true);
        const res = await fetchRecordsByCLuster(clusterId);
        console.log(res?.data|| []);
        setRecords(res?.data|| [] );
      } catch (err) {
        console.error(err);
        setError("Failed to fetch records");
      } finally {
        setLoading(false);
      }
    };

    getRecords();
  }, [clusterId]);

  // 🔄 Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading records...</p>
      </div>
    );
  }
  // useEffect(()=>{
  //   const handleDelete= async()=>{
  //   await api.delete(`clusters/${clusterId}`)
  //   toast.success("Cluster Successfully deleted");
  //   console.log("Cluster deleted")
  // }
  // handleDelete();
  // },[]);
  
const handleDelete = async () => {
  try {
     const confirmDelete= window.confirm("do you really want to delete KhataBook ?")
     if(!confirmDelete){
      return;
     }
    await api.delete(`clusters/${clusterId}`);
    navigate('/profile');
    toast.success("Cluster Successfully deleted");
    console.log("Cluster deleted");
  } catch (error) {
    toast.error("Failed to delete cluster");
    console.error(error);
  }
};
const handleDeleteRecord= async(_id)=>{
try{
await api.delete(`clusters/${clusterId}/records/${_id}`);
toast.success("Record deleted successfully");
setRecords(prevRecords=>prevRecords.filter(exp => exp._id !== _id))
console.log("Record Deleted");
}catch(err){
 toast.error("Failed to delete Record");
    console.error(error);
}
}
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 relative">

        {/*  Back */}
        <button
          onClick={() => navigate("/profile")}
          className="absolute top-4 left-4 text-gray-600 hover:text-black"
        >
        <i class="fa-solid fa-arrow-left"></i> back
        </button>

        {/*  Header */}
       
        <div className=" text-center mb-6">
          <div className=" flex justify-center gap-5 mb-1.5">
          <h2 className="text-xl font-semibold text-gray-800">
            Cluster Records
          </h2>
          <button className='h-8 w-8 bg-blue-500 rounded text-2xl text-white flex justify-center pb-2' onClick={()=>{navigate(`/clusters/${clusterId}/records/create`)}}>+</button>
          <button className='h-8 w-8 text-white rounded text-2xl bg-red-700'>
            <i class="fa-solid fa-trash"  onClick={handleDelete}></i>
            {/* <Trash/> */}
            </button>
          </div>
          
          <p className="text-sm text-gray-500">
            Total Records: {records.length}
          </p>
          
        </div>
        
        

        {/*  Error */}
        {error && (
          <p className="text-center text-red-500 mb-4">{error}</p>
        )}

        {/* 📄 Records List */}
        {records.length === 0 ? (
          <p className="text-center text-gray-500">
            No records found in this cluster
          </p>
        ) : (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            {records.map((record) => (
              <div
                key={record._id}
                className="border rounded-lg p-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {record.description}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(record.date).toLocaleDateString()}
                  </p>
                </div>
                
                 <div className={`font-semibold ${
                    record.type === "Received"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}>
                  {record.type}
                 </div>
                <div
                  className={`font-semibold ${
                    record.type === "Received"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ₹{record.amount}
                </div>
                <div>
                  <button className="h-8 w-8  text-red-700   rounded">
                    <i class="fa-solid fa-trash" onClick={()=>handleDeleteRecord(record._id)}></i>
                    </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Records;
