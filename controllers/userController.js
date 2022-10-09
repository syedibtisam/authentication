import UserModel from "../models/User.js";
import md5 from "md5";
import jwt from "jsonwebtoken"

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
                    // const salt = await bcrypt.genSalt(12);
                    // bcrypt.genSalt(12, function(err, salt) {
                    //     bcrypt.hash(password, salt, function(err, hash) {
                    //         if(err){
                    //             res.send({"status":"failed","message":"password couldn't hash"});
                    //         }
                    //         else{
                    //             hashPassword = hash;
                    //         }
                    //     });
                    // });
                    const newUser = new UserModel({
                        name:name,
                        email:email,
                        password:md5(password),
                        tc:tc
                    });
                    await newUser.save();
                    res.status(201).send({"status":"Successfull","message":"User has been registered."});
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
            if(user){
                if( user.password === md5(password)){
                    res.send({"status":"success","message":"User logged."});

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