import mongoose from "mongoose";

const clusterSchema= new mongoose.Schema({
   name:{
    type:String,
    require: true,
    trim:true,
   },
   date:{
    type:Date,
    required: true,
    default:Date.now,
   },
   user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
   
   }

},{timestamps:true})

export const Cluster = mongoose.model("Cluster", clusterSchema);