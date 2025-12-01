import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import {user} from "../modal/user.js";
import { ENV_CONFIG } from "./env_config.js";


// Google OAuth Strategy
passport.use("google", new GoogleStrategy({
    clientID:ENV_CONFIG.GOOGLE_CLIENT_ID,
    clientSecret:ENV_CONFIG.GOOGLE_CLIENT_SECRET,
    callbackURL:ENV_CONFIG.GOOGLE_CALLBACK_URL,
},async (accessToken,refreshToken,profile,done) => {
    try {
        const existingUser=await user.findOne({email:profile.emails[0].value});
        if(existingUser){
            return done(null,existingUser);
        }
        const newUser=await user.create({
            name:profile.displayName,
            email:profile.emails[0].value,
            password:"google",
        });
        return done(null,newUser);
    } catch (error) {
        return done(error,null);
    }
}));
