/*
import {asyncHandler} from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

import {ApiResponce} from "../utils/ApiResponce.js";
import {ApiError} from "../utils/ApiError.js";

// const generateAccessAndRefreshTokens= async(userId)=>{
//     try{
//   const user= await User.findById(userId);
//   const accesToken=user.generateAccessToken();
//   const refreshToken=user.generateRefreshToken();
//   await user.save({validateBeforeSave:false})
//   return (accesToken, refreshToken)
//     }catch(err){
//    throw new ApiError(500,"something went wrong while generating refresh and access tokens")
//     }
// }

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        console.log("generateTokens userId:", userId); 
        const user = await User.findById(userId);
       
      console.log("Secret length:", process.env.ACCESS_TOKEN_SECRET.length);
console.log(JSON.stringify(process.env.ACCESS_TOKEN_SECRET));



        const accessToken = user.generateAccessToken();
        console.log("Access token generated:", accessToken);
        console.log("Access token generated:", accessToken);
        const refreshToken = user.generateRefreshToken();
        console.log("Access token generated:", accessToken);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (err) {
        throw new ApiError(500, "Error generating tokens");
    }
};

const registerUser=asyncHandler(async(req,res)=>{
    const {username, email, password}=req.body;

    if([username, email,password].some(field => field?.trim()=="")){
        throw new ApiError(400,"all fields are required");
    }
    //aditional
     username = username?.toLowerCase();
    email = email?.toLowerCase();

    const existedUser =  await User.findOne({
        $or :[{username},{email}]
    });
    
    console.log("Checking existing user:", await User.find());
    console.log("Query checking for:", username.toLowerCase(), email.toLowerCase());
    console.log("Found user:", existedUser);
    if(existedUser){
        throw new ApiError(409,"User with email or username already exists");
    }
    const user= await User.create({
        username:username.toLowerCase(),
        email,
        password,
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500,"something went wrong while registering the user")
    }
    return res.status(201).json(
        new ApiResponce(200,createdUser, "User registered Successfully")
    )
});

const loginUser = asyncHandler(async(req, res)=>{
    const {username , email, password}= req.body;
    if(!username && !email){
        throw new ApiError(400, "username or  email is  required")
    }
    const  user = await User.findOne({
        $or:[{username}, {email}]
    })
    if(!user){
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid=await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401, "User does not exist")
    }
    const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id);

    const loggedInUser=await User.findById(user._id).select("-password -refreshToken");
    const options={
        httpOnly : true,
        secure:true
    }

    return res.status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken,options)
    .json(
        new ApiResponce(200,{
            user : loggedInUser,
            accessToken,
            refreshToken
        },"user logged in Successfully"
    )
    )
})
const logoutUser=asyncHandler(async(req,res)=>{

})
export {registerUser,loginUser};

// {
//     "username": "chinu45",
//   "email": "itschinu45@gmail.com",
//   "password": "454545"
// }
*/

import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err) {
    console.log("TOKEN ERROR:", err);
    throw new ApiError(500, "Error generating tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  let { username, email, password } = req.body;

  if ([username, email, password].some((f) => f?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  username = username.toLowerCase();
  email = email.toLowerCase();

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(201)
    .json(new ApiResponce(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or Email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Password is incorrect");
  }

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "lax",//extra added
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponce(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});
const checkAuth= asyncHandler(async(req,res)=>{
  return res.status(200).json({
    success:true,
    message:"User is logged in",
    user:req.user,
  });
});
// const logoutUser= asyncHandler(async(req, res)=>{

//   const userId= req.user._id;
//   await User.findByIdAndUpdate(userId,
//      { $set: { refreshToken: null } },
//       { new: true }
//   )

//   // browser se cookies clear
//     const options = {
//       httpOnly: true,
//       secure: false, // localhost ke liye false, production me true
//       sameSite: "strict",
//     };
//      return res
//       .status(200)
//       .clearCookie("accessToken", options)
//       .clearCookie("refreshToken", options)
//       .json(
//         new ApiError({
//         success: true,
//         message: "Logged out successfully",
//       })
//       );
// })

// const logoutUser = asyncHandler(async (req, res) => {
//   res
//     .clearCookie("token", {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//     })
//     .status(200)
//     .json({
//       success: true,
//       message: "Logged out successfully"
//     });
// });


const logoutUser = asyncHandler(async(req,res)=>{
  await User.findByIdAndUpdate(
    req.user._id,
    {$set :{refreshToken:null}},
    {new: true}
  );
  
  const options = {
    httpOnly: true,
    secure: false, // localhost = false, production = true
    sameSite: "lax",
  };
  return res
  .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      success: true,
      message: "Logged out successfully",
    });
})
export { registerUser, loginUser,checkAuth,logoutUser};
