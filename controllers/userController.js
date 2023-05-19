import UserModel from "../models/User.js";
import md5 from "md5";
import jwt from "jsonwebtoken"
import transporter from "../config/emailConfig.js";

export async function userRegistration(req,res){
    const {name,email,password,password_confirmation,tc} = req.body;
    // console.log(req.body);
    const user = await UserModel.findOne({email:email});
    if(user){
        res.send({"status":"failed","message":"Email already exist"});
        console.log(user);
    }
    else{
        if( name && email && password && password_confirmation && tc){
            if( password === password_confirmation){
                try {
                    const newUser = new UserModel({
                        name:name,
                        email:email,
                        password:md5(password),
                        tc:tc
                    });
                    await newUser.save();
                    const newSavedUser = await UserModel.findOne({email:email});
                    // generating token
                    const token = jwt.sign({userID:newSavedUser._id},process.env.JWT_SECRET_KEY ,{expiresIn:"5d"});
                    res.status(201).send({"status":"Successfull","message":"User has been registered.","token":token});
                } catch (error) {
                    console.log("Error :",error);
                    res.send({"status":"failed","message":"User couldn't register."});
                }
            }
            else{
                res.send({"status":"failed","message":"Password and confirm password does not matched."});
            }
        }
        else{
            res.send({"status":"failed","message":"All fields are required"});
        }
    }
}

export async function userLogin(req,res){
    try {
        const {email,password} = req.body;
        if(email && password){
            const user = await UserModel.findOne({email:email});
            console.log(user);
            if(user){
                if( user.password === md5(password)){
                    // generating token
                    const token = jwt.sign({userID:user._id},process.env.JWT_SECRET_KEY ,{expiresIn:"5d"});
                    
                    res.send({"status":"success","message":"User logged.","token":token});

                }
                else{
                    res.send({"status":"failed","message":"User email or password is not correct."});
                }
            }
            else{
                res.send({"status":"failed","message":"User not registered"});
            }
        }
        else{
            res.send({"status":"failed","message":"All fields are required"});
        }
    } catch (error) {
        console.log(error);
        res.send({"status":"failed","message":"Unable to login."});

    }
}
export async function changeUserPassword(req,res){
    // console.log("in ftn");
    const {password,password_confirmation} = req.body;
    if(password && password_confirmation){
        if(password === password_confirmation){
            console.log("user :",req.user);
            UserModel.findByIdAndUpdate(req.user._id,{password:md5(password)},{new: true},
            function (err, response) {
              // Handle any possible database errors
              if (err) {
                console.log("we hit an error while storing in database" + err);
                res.json({
                  message: 'Database Update Failure'
                });
              }
            //   console.log("This is the Response: " + response);
            });

            res.send({"status":"success","message":"Password changed"});
        }
        else{
            res.send({"status":"failed","message":"Password does not match"});
        }
    }
    else{
        res.send({"status":"failed","message":"All fileds are required."});
    }
}

export async function currentUserDetails(req,res){
    res.send({"user":req.user});
}

export async function sendUserPasswordResetEmail(req,res){
    const {email} = req.body;
    if(email){
        const user = await UserModel.findOne({email:email});
        if(user){
            const secret = user._id + process.env.JWT_SECRET_KEY;
            const token = jwt.sign({userID:user._id},secret,{expiresIn:"15m"});
            const link = `http://localhost:2000/api/user/reset-password/${user._id}/${token}`;
            // route to run on frontend /api/user/:id/:token
            //send email
            let info = await transporter.sendMail({
                from: process.env.EMAIL_FROM, // sender address
                to: user.email, // list of receivers
                subject: "Password Reset Link", // Subject line
                // text: link, // plain text body
                html: `<a herf = ${link}>Click here</a> to reset your password` // html body
            },(err)=>{
                if(err){
                    console.log("Error Occured");
                    console.log(err);
                }
                else{
                    console.log("Email has been sent");
                }
            }
            );

            console.log(link);
            res.send({"status":"success","message":"Password reset link has been sent to your email.","Info":info});
        }
        else{
            res.send({"status":"failed","message":"email does not exist."});
        }
    }
    else{
        res.send({"status":"failed","message":"email is required."});
    }
}
export async function userPasswordReset(req,res){
    const {password , password_confirmation} = req.body;
    const {id,token} = req.params;
    const user = await UserModel.findById(id);
    const new_secret = user._id + process.env.JWT_SECRET_KEY;
    try {
        jwt.verify(token,new_secret)
        if(password && password_confirmation){
            if(password === password_confirmation){
                UserModel.findByIdAndUpdate(user._id,{password:md5(password)},{new: true},
                function (err, response) {
                // Handle any possible database errors
                if (err) {
                    console.log("we hit an error while storing in database" + err);
                    res.json({
                    message: 'Database Update Failure'
                    });
                }
                //   console.log("This is the Response: " + response);
                });
                res.send({"status":"success","message":"Password has been updated."});
            }
            else{
                res.send({"status":"failed","message":"Password and confimr password does not match."});
            }
        }
        else{
            res.send({"status":"failed","message":"All fields are required."});
        }
    } catch (error) {
        res.send({"status":"failed","message":"Invalid token."});
    }
}

export async function getAllUsers(req,res){
    // console.log();
    res.send(await UserModel.findOne({email:"ahmed@gmail.com"}));
}