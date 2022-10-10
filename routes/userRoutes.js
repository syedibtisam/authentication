import express  from "express";

const router = express.Router();
import { checkUserAuth } from "../middlewares/auth-middleware.js";
import {userRegistration,userLogin,changeUserPassword,currentUserDetails} from "../controllers/userController.js"

// middlewares for authorization
router.use("/changepassword",checkUserAuth);
router.use("/loggeduser",checkUserAuth);

//public routes
router.post("/register",userRegistration);
router.post("/login",userLogin);

//protected routes
router.post("/changepassword",changeUserPassword);
router.post("/loggeduser",currentUserDetails);


export default router;