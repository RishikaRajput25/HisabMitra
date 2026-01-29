import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Expense } from "../models/expense.model.js";
 const addExpense = asyncHandler(async(req,res)=>{

try{

    const userId = req.user &&(req.user.id || req.user._id);
    if(!userId){
        throw new ApiError(401,{success:false,error: "Unauthorized"},);
    }
    const {title, amount,type, category,description, date}=req.body;

    if (!title || !amount || !category || !date) {
    throw new ApiError(400, "All fields are required");
}

   const normalizedCategory = category.toLowerCase();

const  expense = await Expense.create({
    title,
    amount,
    category:normalizedCategory,
    description,
    type,
    date: date || Date.now(),
    user:userId
});

return res
    .status(201)
    .json(new ApiResponce(200, expense, "Expense created successfully"));
}catch(err){
  console.error("createExpense error:", err);
  throw new ApiError(500,"Server Error")
}

})
// const getAllExpense= asyncHandler(async(req,res)=>{
// try{
// const userId= req.user && (req.user.id || req.user._id);
// if(!userId){
//     throw new ApiError(401,"Unauthorized");
// }

// const page=Math.max(1,parseInt(req.query.page || '1',10 ));
// const limit =Math.min(100,parseInt(req.query.limit || '20',10));
// const skip=(page-1)*limit;
// const filter={user :userId};

// if(req.query.category){
//     filter.category=req.query.category;
// }
// if(req.query.from || req.query.to){
//      filter.date = {};
//       if (req.query.from) filter.date.$gte = new Date(req.query.from);

//       if (req.query.to) filter.date.$lte = new Date(req.query.to);
// }

// const sort = req.query.sort ='asc' ?{date :1}:{date:-1};

// const [total, Expense]=await Promise.all([
//  Expense.countDocuments(filter),
//       Expense.find(filter)
//         .sort(sort)
//         .skip(skip)
//         .limit(limit)
//         .lean()   
// ])

// return res
//   .status(200)
//   .json(new ApiResponce(
//     200, 
//     { total, page, limit, expenses },
//     "Expenses fetched successfully"
//   ));


// }catch(err){
//  console.error("getUserExpenses error:", err);
//     throw new ApiError(500,"Server Error")
// }
// })
const getAllExpense = asyncHandler(async (req, res) => {
  try {
    const userId = req.user && (req.user.id || req.user._id);
    if (!userId) {
      throw new ApiError(401, "Unauthorized");
    }

    const page = Math.max(1, parseInt(req.query.page || "1", 10));
    const limit = Math.min(100, parseInt(req.query.limit || "20", 10));
    const skip = (page - 1) * limit;

    const filter = { user: userId };

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.from || req.query.to) {
      filter.date = {};
      if (req.query.from) filter.date.$gte = new Date(req.query.from);
      if (req.query.to) filter.date.$lte = new Date(req.query.to);
    }

    const sort = req.query.sort === "asc" ? { date: 1 } : { date: -1 };

    const [total, expenses] = await Promise.all([
      Expense.countDocuments(filter),
      Expense.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    ]);

    return res.status(200).json(
      new ApiResponce(
        200,
        { total, page, limit, expenses },
        "Expenses fetched successfully"
      )
    );
  } catch (err) {
    console.error("getUserExpenses error:", err);
    throw new ApiError(500, "Server Error");
  }
});

const getExpenseById= asyncHandler(async(req,res)=>{
    try{
const userId = req.user &&(req.user.id || req.user._id);
if(!userId) {
    throw new ApiError(401,"Unauthorized");
}
const expense= await Expense.findById(req.params.id).lean();
if(!expense){
    throw new ApiError(404,"Expense not found");
}
if(expense.user.toString() != userId.toString()){
throw new ApiError(403,"Forbidden: not your expense");
}
return res.status(200).json( new ApiResponce(true, expense));
}
    catch(err){
 console.error("getExpenseById error:", err);
    if (err.kind === 'ObjectId') throw new ApiError(400,"Invalid ID");
    throw new ApiError(500, "Server Error")
    }
})
const updateExpense = asyncHandler(async(req,res)=>{
    try{
      const userId =req.user &&(req.user.id || req.user._id);
      if(!userId){
        throw new ApiError(401, "Unauthorized");
      }
      const expense= await Expense.findById(req.params.id);
      if(!expense){
        throw new ApiError(404, "Expense not found");
      }
      if(expense.user.toString() != userId.toString()){
        throw new ApiError(403,"Forbidden: not your expense")
      }
     const allowedUpdates=['title', 'amount', 'category', 'date', 'description'];
     allowedUpdates.forEach(field =>{
        if(req.body[field] != undefined){
            expense[field]=req.body[field];
        }
     })
     await expense.save();
    return res.status(200).json(new ApiResponce(200,expense,"Expense updated successfully"));
    }
    catch(err){
     console.error("updateExpense error:", err);
     if (err.kind === 'ObjectId') {
        throw new ApiError(400,"Invalid ID")
     }
    throw new ApiError(500, "Server Error");
  }
    })

  const deleteExpense= asyncHandler(async(req,res)=>{
    try{
  const userId= req.user && (req.user.id || req.user._id);
  if(!userId){
    throw new ApiError(401,"Unauthorized");
  }
  const expense = await Expense.findById(req.params.id);
  if(!expense){
    throw new ApiError(404,"Expense not found");
  }
  if(expense.user.toString() != userId.toString()){
    throw new ApiError(403,"Forbidden: not your expense")
  }
  await expense.deleteOne();
  return res.status(200).json( new ApiResponce(200,"Expense deleted"));

    }
    catch(err){
      console.error("deleteExpense Error :", err);
      if(err.kind === 'ObjectId'){
        throw new ApiError(400,"Invalid ID")
      }
      return res.status(500).json( new ApiError(500, "Server Error"));
    }
  })
export {addExpense, getAllExpense, getExpenseById,updateExpense, deleteExpense};