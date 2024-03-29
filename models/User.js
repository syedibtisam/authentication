import mongoose from "mongoose";

//Definin sechema
const userSchema = new mongoose.Schema({
    name: {type : String, required:true,trim : true},
    email: {type : String, required:true,trim : true},
    password: {type : String, required:true,trim : true},
    tc: {type : Boolean, required:true}
})

//Creating model
const UserModel = mongoose.model("client",userSchema);

export default UserModel;