import dotenv from "dotenv"
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectdb from "./config/connectdb.js"
import userRoutes from "./routes/userRoutes.js";
const app = express();

const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(bodyParser.json());

// CORS policy
app.use(cors());

//Connection of database
connectdb(DATABASE_URL);

//Users routes api
app.use("/api/user",userRoutes);


app.get("/",(req,res)=>{
    res.send("Its fine");
})

app.listen(port,()=>{
    console.log("Server running on port",port);
})