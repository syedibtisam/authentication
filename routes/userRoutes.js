import express  from "express";

const router = express.Router();
import { checkUserAuth } from "../middlewares/auth-middleware.js";
import * as userController from "../controllers/userController.js"
// import {getAllUsers,userRegistration,userLogin,changeUserPassword,currentUserDetails,sendUserPasswordResetEmail,userPasswordReset} 
// from "../controllers/userController.js"

// middlewares for authorization
router.use("/changepassword",checkUserAuth);
router.use("/loggeduser",checkUserAuth);

//public routes
router.post("/register",userController.userRegistration);
router.post("/login",userController.userLogin);
router.post("/send-reset-password-email",userController.sendUserPasswordResetEmail);
router.post("/reset-password/:id/:token",userController.userPasswordReset);
router.get("/users",userController.getAllUsers);

//protected routes
router.post("/changepassword",userController.changeUserPassword);
router.post("/loggeduser",userController.currentUserDetails);


export default router;