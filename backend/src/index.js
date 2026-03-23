
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config();

connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`App is listening on port ${process.env.PORT || 3000}`);
    });
}).catch((err) => {
    console.log("MongoDB Connection failed!", err);
});