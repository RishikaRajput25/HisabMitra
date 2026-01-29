/*
//import dotenv from "dotenv";

import connectDB from "./db/index.js";
import app from "./app.js";
// dotenv.config({
//     path: './env'
// })
connectDB().then(()=>{
    app.listen(3000, ()=>{
    console.log(`app is listening on port ${process.env.PORT}`);
})
}).catch((err)=>{
    console.log("Mongo DB Connection failed 1!",err)
})
*/


import connectDB from "./db/index.js";
import app from "./app.js";

connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`App is listening on port ${process.env.PORT || 3000}`);
    });
}).catch((err) => {
    console.log("MongoDB Connection failed!", err);
});