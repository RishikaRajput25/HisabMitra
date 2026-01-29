import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import {Record} from "../models/record.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { Cluster } from "../models/cluster.model.js";


export const createRecord = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const clusterId = req.params.clusterId;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  if (!clusterId) {
    throw new ApiError(400, "Cluster id is required");
  }

  const { description, amount, type, date } = req.body;

  if (!amount || !type) {
    throw new ApiError(400, "Amount and type are required");
  }

  // ✅ duplicate check (CORRECT)
  const existingRecord = await Record.findOne({
    description,
    amount,
    date,
    cluster: clusterId,
    user: userId,
  });

  if (existingRecord) {
    throw new ApiError(409, "Record already exists in this cluster");
  }

  const record = await Record.create({
    description,
    amount,
    type,
    date,
    cluster: clusterId,   // ✅ only from params
    user: userId,
  });

  return res.status(201).json(
    new ApiResponce(201, record, "Record created successfully")
  );
});

 export const  getRecordsByClusture = asyncHandler(async(req,res)=>{
    const userId= req.user?._id;
    if(!userId){
        throw new ApiError(401,"Unauthorized");
    }
     const {clusterId}= req.params;
    if(!clusterId){
        throw new ApiError(400,"cluster Id is required");
    }
   
     const cluster = await Cluster.findOne({
        _id:clusterId,
        user:userId,
     })
       if (!cluster) {
    throw new ApiError(404, "Cluster not found");
  }
  //fetch records
  const records= await Record.find({
    cluster : clusterId,
    user: userId,
  }).sort({date : -1});

  return res.status(201).json(new ApiResponce(200, records, "Records fetched successfully"));

})

export  const updateRecord = asyncHandler(async(req,res)=>{
    const userId= req.user?._id;
    const { clusterId, recordId } = req.params;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }
if (!mongoose.Types.ObjectId.isValid(clusterId) ||
      !mongoose.Types.ObjectId.isValid(recordId)) {
    throw new ApiError(400, "Invalid ID");
  }
  const record= await Record.findOne({
    _id:recordId,
    cluster: clusterId,
    user:userId,
  });
if (!record) {
    throw new ApiError(404, "Record not found");
  }

  const {description,amount,type,date}=req.body;

//   const updatedRecords= await Record.findOneAndUpdate({
//     description,
//     amount,
//     type,
//     date
//   },{new:true})

 const updatedRecord = await Record.findOneAndUpdate(
    {
      _id: recordId,
      cluster: clusterId,
      user: userId,   // 🔐 security
    },
    {
      $set: {
        ...(description && { description }),
        ...(amount && { amount }),
        ...(type && { type }),
        ...(date && { date }),
      },
    },
    {
      new: true,       
      runValidators: true,
    }
  );

  if (!updatedRecord) {
    throw new ApiError(404, "Record not found");
  }

  return res.json(new ApiResponce(200,updatedRecord,"Record updated successfully"));

})

export const deleteRecord = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { clusterId, recordId } = req.params;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  if (!mongoose.Types.ObjectId.isValid(clusterId) ||
      !mongoose.Types.ObjectId.isValid(recordId)) {
    throw new ApiError(400, "Invalid ID");
  }

  const record = await Record.findOneAndDelete({
    _id: recordId,
    cluster: clusterId,
    user: userId,
  });

  if (!record) {
    throw new ApiError(404, "Record not found or already deleted");
  }

  return res.status(200).json(
    new ApiResponce(200, null, "Record deleted successfully")
  );
});

