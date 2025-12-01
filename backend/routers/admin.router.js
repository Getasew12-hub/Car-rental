import express from "express";
import { protectRoute } from "../middleware/protect.router.js";
import { addCarController, carListController, dashboardController, deleteCarController, getBookingController, toggleCarAvailablity, toggleFeaturedCar, updateBookingController } from "../controllers/admin.controller.js";

const router=express.Router();
router.get("/dashboard",dashboardController);
router.get("/carslist",carListController);
router.get("/getBooking",getBookingController);
router.post("/addcar",addCarController);
router.patch("/toggleCarAvailablity/:id",toggleCarAvailablity);
router.patch("/toggleFeaturedCar/:id",toggleFeaturedCar);
router.patch("/updatebooking/:id",updateBookingController);
router.delete("/deletecar/:id",deleteCarController);



export default router;