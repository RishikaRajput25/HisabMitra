import mongoose from "mongoose";
// const expenseList= new mongoose.Schema({
// category:{
//     type:String,
//     required:true,
//     trim:true
// },
// item:{
//     type:String,
//     required:true,
//      trim:true
// },
// amount:{
//     type:Number,
//     required :true,
//     trim: true
// },

// date:{
//     true:Date,
//     reuired:true
// },
// type:{
//     type:String,
//     enum:["paid", "Received"]
// },
// user: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "User",
//   required: true
// }
// }, {timestamps:true});
const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Expense title is required"],
    trim: true,
    maxlength: 120
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0, "Amount cannot be negative"]
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true
  },
  type:{
    type:String,
    enum:["Paid", "Received"],
    required:true
},
  date: {
    type: Date,
    required: [true, "Date is required"],
    default: Date.now
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  }
}, {
  timestamps: true
});
//expenseSchema.index({ user: 1, date: -1 });
 export const Expense= mongoose.model("Expense",expenseSchema)
 