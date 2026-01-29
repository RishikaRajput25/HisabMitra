import { Router } from "express";
import { registerUser,loginUser, checkAuth,logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router= Router();
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/check-auth').get(verifyJWT,checkAuth);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;