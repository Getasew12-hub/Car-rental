import mongoose from "mongoose";
import { ENV_CONFIG } from "./env_config.js";
const mongodb=async()=>{
    try {
       
         const conn=await mongoose.connect(ENV_CONFIG.MONGOOSE_URI);

        console.log("Database connected successfully",conn.connection.host);
    } catch (error) {
         console.error("Error in database connection",error.message);
        process.exit(1);
    
    }
}


export default mongodb;