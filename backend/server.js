import express from "express";
import { ENV_CONFIG } from "./configration/env_config.js";
import cors from "cors";

import authRouter from "./routers/auth.router.js"
import mongodb from "./configration/database.js";
import cookieParser from "cookie-parser";
import adminRouter from "./routers/admin.router.js";
import { CloudinaryConfig } from "./configration/cloudinary.js";
import { adminProtectRoute } from "./middleware/protect.router.js";
import bookingRouter from "./routers/booking.router.js"
import carRouter from "./routers/car.router.js";
import passport from "passport";
import "./configration/google.auth.js";




const app=express();

const port=ENV_CONFIG.PORT || 5000;

app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:"10mb"}));
app.use(cookieParser());

// The frontend URL will be something like https://<your-project-name>.vercel.app
// We use an environment variable to make it flexible.
const frontendURL = ENV_CONFIG.FRONTEND_URL || 'http://localhost:3000';

app.use(cors({
    origin: frontendURL,
    credentials:true,
}));

CloudinaryConfig();
mongodb(); // Connect to the database when the function starts
app.use(passport.initialize());
app.get("/",(req,res)=>{
    res.send("API is working....");
})

app.use("/api/auth",authRouter);
app.use("/api/admin",adminProtectRoute,adminRouter);
app.use("/api/booking",bookingRouter);
app.use("/api/cars",carRouter);




// Remove app.listen for serverless deployment
// app.listen(port,()=>{
//     console.log("Your server running on port :",port);
//     mongodb();
// })

// Export the app instance for Vercel
export default app;