import exporess from "express";
import { addBookingController, getBookingController } from "../controllers/booking.controller.js";
import { protectRoute } from "../middleware/protect.router.js";
const router=exporess.Router();
 router.get("/getbooking",protectRoute, getBookingController);


 router.post("/addBooking",protectRoute,addBookingController);

 

export default router;