import { v2 as cloudinary } from 'cloudinary';
import { ENV_CONFIG } from './env_config.js';


export const CloudinaryConfig=async () => {
    try {

            cloudinary.config({ 
        cloud_name: 'dicwd5uae', 
        api_key:ENV_CONFIG.CLOUDINARY_KEY, 
        api_secret: ENV_CONFIG.CLOUDINARY_SECRET 
    });

    console.log("Cloudinary Success fully connected")
        
    } catch (error) {
        console.log("Error on Cloudinary configrarion",error);
    }
}