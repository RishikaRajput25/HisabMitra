/*
it is correct per infinite loop hatane ke liye paste kar rahe 
*/ 

// import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://localhost:3000/api/v1",
//   withCredentials: true,
// });
// export const checkLoginStatus=async()=>{
//   try{
//   const res = await api.get("/users/check-auth");
//   return res.data;
//   }catch(error){
//  return null;
//   }
// }

import axios from "axios";
import toast from "react-hot-toast";
export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

export const checkLoginStatus = async () => {
  try {
    const res = await api.get("/users/check-auth");
     
    return res.data;
  } catch (error) {
    return null;
  }
};

export const logoutUser= async()=>{
  try{
    const res= await api.post("/users/logout");
    toast.success("User logout successfully")
    return res.data;
  }
  catch(err){
    return null;
  }
}
export const fetchExpenses= async()=>{
  const res= await api.get("/expenses");
  console.log(res.data);
  return res.data;
}

export const fetchClusters= async()=>{
  const res= await api.get('/clusters');
  console.log(res.data);
  return res.data;
}

export const fetchRecordsByCLuster= async(clusterId)=>{
  const res = await api.get(`/clusters/${clusterId}/records`);
  return res.data;
}