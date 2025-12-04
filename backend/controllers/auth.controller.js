import {user} from "../modal/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ENV_CONFIG } from "../configration/env_config.js";

function generateToken(res,userid){
    const token=jwt.sign({userid},ENV_CONFIG.TOKEN_KEY,{expiresIn:'7d'});
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"none",
        maxAge:7*24*60*60*1000,
    });


}

export const Signup=async (req,res) => {
   
    try {
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).send("All fields are required");
        }

        if(password.length < 6){
            return res.status(400).send("Password must be at least 6 characters long");
        }
        
        const existingUser=await user.findOne({email});
        if(existingUser) return res.status(400).json({message:"User already exists. Please login."});

         const hashedPassword=await bcrypt.hash(password,10);
         
         const newUser= await user.create({
            name,
            email,
            password:hashedPassword,
         })

         await generateToken(res,newUser._id);

   return res.status(201).json({...newUser._doc,password:undefined});
        
    } catch (error) {
         console.error("Error during signup:",error.message);
        return res.status(500).send("Internal Server Error");  
       

        
    }
}

export const Login=async (req,res) => {
    
    try {
     const {password,email}=req.body;

     if(!password || !email) return res.status(400).json({error:"All inpute is required"});
     const existingUser=await user.findOne({email});

     if(!existingUser) return res.status(400).json({error:"User not found. Please signup."});
    const  hashPassword=await bcrypt.compare(password,existingUser.password);

    if(!hashPassword) return res.status(400).json({error:"Incorrect password"});
    
     await generateToken(res,existingUser._id);

     return res.status(200).json({...existingUser._doc,password:undefined});
        
    } catch (error) {
        console.error("Error during login:",error.message); 
       return res.status(500).send("Internal Server Error");  
        
    }
}
export const Logout=async (req,res) => {
    try {
        res.clearCookie("token");
        return res.status(200).send("Logout successful");

    } catch (error) {
          console.error("Error during logout:",error.message);
        res.status(500).send("Internal Server Error");  
      
    }
}


export const checkToken=async(req,res)=>{
  
        const userData=req.user;
        return res.status(200).json({...userData._doc});
        
 
}

export const googleAuth=async(req,res)=>{
    try {
        const userData=req.user;
        await generateToken(res,userData._id);
        res.redirect(ENV_CONFIG.FRONTEND_URL);
    } catch (error) {
        console.error("Error during Google authentication:",error.message);
        res.status(500).send("Internal Server Error");
    }

    }