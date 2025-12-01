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
import env from "dotenv";
env.config();





const app=express();

const port=ENV_CONFIG.PORT || 5000;

app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:"10mb"}));
app.use(cookieParser());

app.use(cors({
    origin:process.env.NODE_ENV==="development" ? 'http://localhost:3000' :process.env.PRODUCTION_URL,
    credentials:true,
}));
  CloudinaryConfig()

app.use("/api/auth",authRouter);
app.use("/api/admin",adminProtectRoute,adminRouter);
app.use("/api/booking",bookingRouter);
app.use("/api/cars",carRouter);

app.use(passport.initialize());



app.listen(port,()=>{
    console.log("Your server running on port :",port);

    mongodb();
})