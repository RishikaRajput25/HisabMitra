import mongoose from "mongoose";
const recordSchema= new mongoose.Schema({
date:{
    type:Date,
    required:true,
    default: Date.now
},
description:{
    type: String,
    required: true,
    trim:true,
    maxlength:100
},
amount:{
    type: Number,
    required: true,
},
type:{
    type: String,
    enum:["Paid", "Received"],
    required:true,
},
cluster:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Cluster",
    reuired:true
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
}
}, {timestamps: true})

 export const Record = mongoose.model("Record", recordSchema);