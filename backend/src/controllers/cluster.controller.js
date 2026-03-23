import { Cluster } from "../models/cluster.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";
//Create Cluster
export  const createCluster= asyncHandler(async(req,res)=>{
    try{
    const userId = req.user &&(req.user.id || req.user._id);
    if(!userId){
        throw new ApiError(401,{success:false,error: "Unauthorized"},);
    }
 const {name}= req.body;

const cluster= await Cluster.create({
    name,
    user: req.user._id,
});

return res
.status(201)
.json(new ApiResponce(200,cluster,"Cluster successfully created"));
 }
catch(err){
console.error("createCluster Error :", err);
throw new ApiError(500, "Server Error!");
}
});
//getClusters
export const getClusters= asyncHandler(async(req,res)=>{
  try{
    const userId = req.user &&(req.user.id || req.user._id);
    if(!userId){
        throw new ApiError(401,{success:false,error: "Unauthorized"},);
    }

    const clusters = await Cluster.find({user:req.user._id}).sort({createdAt: -1,  
    })
    return res.status(201)
    .json(new ApiResponce(200,{data:clusters},"All clusters"));}
    catch(err){
        throw new ApiError(500,err);
    }
});

export const updateCluster= asyncHandler(async(req,res)=>{
  try{
    const cluster= await Cluster.findOneAndUpdate(
        {_id: req.params.id, user:req.user._id},
        {name:req.body.name},
        {new:true}  
    )
    if(!cluster){
        throw new ApiError(404,"Cluster not Found");          
    }
    return res.json(new ApiResponce(201, cluster,"Updated successfully"));
  }
catch(err){
   throw new ApiError(500,"Server Error");
    }
});

export const  deleteCluster= asyncHandler(async(req, res)=>{
    try{

         const cluster =  await Cluster.findOneAndDelete({
            _id:req.params.id,
            user:req.user._id,
         })
         if(!cluster){
            throw new ApiError(404,"Cluster not Found");
         }
         return res.json(new ApiResponce(201, "Cluster deleted successfully"));
    }
    catch(err){
    throw new ApiError(500,err.message);
    }
})
