import express from "express";
import { checkToken, Login, Logout, Signup,googleAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protect.router.js";

import passport from "passport";

const router=express.Router();

router.post("/signup",Signup);
router.post("/login",Login);
router.post("/logout",Logout);
router.get("/google",passport.authenticate("google",{
    scope:["profile","email"],

}));
router.get("/google/callback",passport.authenticate("google",{
    failureRedirect:"http://localhost:3000",
    session:false,
}),googleAuth);




router.post("/chektoken",protectRoute,checkToken);

export default router;


  
