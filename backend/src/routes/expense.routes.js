import { Router } from "express";
import { addExpense,getAllExpense,getExpenseById ,updateExpense,deleteExpense} from "../controllers/expense.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router= Router();
console.log("Expense Routes Loaded");

router.route('/add').post(verifyJWT,addExpense);
router.route('/').get(verifyJWT,getAllExpense);
router.route('/:id').get(verifyJWT,getExpenseById);
router.route('/:id').put(verifyJWT,updateExpense)
router.route('/:id').delete(verifyJWT,deleteExpense);
export default router;