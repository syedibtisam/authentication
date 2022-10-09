import express  from "express";

const router = express.Router();

import {userRegistration,userLogin} from "../controllers/userController.js"

//public routes
router.post("/register",userRegistration);
router.post("/login",userLogin);

//protected routes

export default router;