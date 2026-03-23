
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
const app=express();
dotenv.config({
path: './.env'
})

// dotenv.config();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());
import userRouter from "./routes/user.routes.js";
import expenseRouter from "./routes/expense.routes.js";
import clusterRouter from "./routes/cluster.routes.js"
import recordRouter from "./routes/record.routes.js";
app.use((req,res,next)=>{
    console.log("Incoming Request:", req.method, req.url);
    next();
});
//route destination
app.use("/api/v1/users",userRouter);
app.use("/api/v1/expenses",expenseRouter);
app.use("/api/v1/clusters",clusterRouter);
app.use('/api/v1/clusters/:clusterId/records',recordRouter);
// Fallback (for 404)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
export default app;

/*
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config(); // Load default .env

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import userRouter from "./routes/user.routes.js";
import expenseRouter from "./routes/expense.routes.js";
import clusterRouter from "./routes/cluster.routes.js";
import recordRouter from "./routes/record.routes.js";

app.use((req, res, next) => {
    console.log("Incoming Request:", req.method, req.url);
    next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/expenses", expenseRouter);
app.use("/api/v1/clusters", clusterRouter);
app.use('/api/v1/clusters/:clusterId/records', recordRouter);

// Fallback 404
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

export default app;
*/