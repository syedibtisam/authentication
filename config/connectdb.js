import mongoose from "mongoose";

export default async function connectDB(DATABASE_URL){
    try {
        const DB_OPTIONS = {
            dbName: "geekshop"
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS);
        console.log("Mongoose connected successfully!!!");
    } catch (error) {
        console.log("Error occured while connecting to mongoose server\nDetails :",error);
    }
}