//import { hash } from "bcrypt";
import bcrypt from "bcrypt";

import mongoose from "mongoose";
/*const userSchema= new mongoose.Schema({
username:{
    type: String,
    required:true,
    maxlength: 50,
    trim:true
},
email:{
    type:String,
    required :true, 
    trim:true
},
password:{
    type: String,
    require:true
},
refreshToken:{
    type:String
},
Expense:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Expense"
}

},{timestamps:true})

//ye ek pre hook hai jo data ke save hone se pehle run hoga har baar isliye under if condition lagayi ki agar password modifies ho ya password dalo tabh  password ko encrypt karo 
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password=await  bcrypt.hash(this.password,10)
    next()
})
//tom compare the encrypted password ki sahi hai na nhi
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password, this.password)
}
//jwt work
userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this._id.toString(),
        username:this.username,
        email:this.email,
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
            _id:this._id.toString(),
           
        },process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        })
}
 export const User= mongoose.model("User",userSchema);
 */


import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    }
    // Expense: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Expense",
    // },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};


// ACCESS TOKEN
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id.toString(),
      username: this.username,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};


// REFRESH TOKEN
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id.toString(),
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
export  const User = mongoose.model("User", userSchema);
