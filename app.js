import dotenv from "dotenv"
dotenv.config();
import express from "express";
import cors from "cors";
import connectdb from "./config/connectdb.js"

const app = express();

const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// CORS policy
app.use(cors());

//Connection of database
connectdb(DATABASE_URL);

app.get("/",(req,res)=>{
    res.send("Its fine");
})

app.listen(port,()=>{
    console.log("Server running on port",port);
})