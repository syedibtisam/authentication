import jwt  from "jsonwebtoken";
import UserModel from "../models/User.js";

export async function checkUserAuth(req,res,next){
    let token;
    const {authorization} = req.headers;
    if(authorization && authorization.startsWith("Bearer")){
        try {
            token = authorization.split(" ")[1];
            //verify token
            console.log("token :",token);

            const {userID} = jwt.verify(token,process.env.JWT_SECRET_KEY);
            console.log("User id :",userID);
            //Get user from token
            req.user = await UserModel.findById(userID).select("-password");
            next();

        } catch (error) {
            res.status(401).send({"status":"failed","message":"Unauthorized User"});
        }
    }
    else{
        res.status(401).send({"status":"failed","message":"No token"});
    }
}