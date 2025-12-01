import env from "dotenv";
env.config();

export const  ENV_CONFIG={
   PORT:process.env.PORT,
   TOKEN_KEY:process.env.TOKEN_KEY,
   MONGODB_KEY:process.env.MONGODB_LOCAL,
   MONGOOSE_URI:process.env.MONGOOSE_URI,
   CLOUDINARY_SECRET:process.env.CLOUDINARY_API_SECRET,
   CLOUDINARY_KEY:process.env.CLOUDINARY_API_KEY,
   GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
   GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
   GOOGLE_CALLBACK_URL:process.env.GOOGLE_CALLBACK_URL,
}