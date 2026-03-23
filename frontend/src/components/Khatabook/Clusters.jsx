
import React from 'react'
import { fetchClusters } from '../api/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Clusters = () => {
  const navigate= useNavigate();
  const [Cluster, setCluster]=useState([]);
  const [loading, setLoading]=useState(true)
  useEffect(()=>{
    const getCLusters=async()=>{
    try{
    const res = await fetchClusters();
   
    setCluster(res?.data?.data || []);
    }
    catch(err){
       console.log("Fetching Cluster Error:",err);
    }
    finally{
    setLoading(false);
    }
  }
  getCLusters();
  },[])
  if(loading){
   return <p>Loading</p>
  }
 
  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-4">
     <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 " >
      {
       Cluster.length === 0 ?(

       <p>No clusters found</p>
      
      ):(
        Cluster.map((cluster)=>(
          <div key={cluster._id} className='border rounded-xl p-4 hover:shadow-lg transition bg-white'
          onClick={()=>navigate(`/clusters/${cluster._id}/records`)}>
            <div className='flex  justify-between'>
           <h3 className="font-semibold text-gray-800">{cluster.name}</h3>
           <button className='h-10 w-10 bg-blue-500 rounded text-2xl text-white pb-1' onClick={()=>{navigate(`/clusters/records/create`)}}>
            + 
           

           </button>
           </div>
            {/* <p className="text-sm text-gray-500">Total Records: 0</p> */}
            <p className="text-sm text-gray-500">{new Date(cluster.date).toLocaleDateString("en-GB")}</p>
         
          </div>
         
        ))
       )
      }
    </div>
  )
}

export default Clusters
