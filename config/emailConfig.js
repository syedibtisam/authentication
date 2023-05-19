import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config();

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service:"gamil",
    auth:{
        user:process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    // secure: true, // true for 465, false for other ports
    // auth: {
    //   user: process.env.EMAIL_USER, // generated ethereal user
    //   pass: process.env.EMAIL_PASS, // generated ethereal password
    // },
  });

export default transporter;