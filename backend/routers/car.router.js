import express from "express";
import { getBookedCarsController, getCarByIdController, getCarByPickeUpReturn, getCarBySearch, getCarListController, getFeaturedCarsController, searchWordController } from "../controllers/car.controller.js";
import {protectRoute} from "../middleware/protect.router.js"



const router=express.Router();
router.get("/getSearchword",searchWordController);
router.get("/getcarslist",getCarListController);
router.get("/featuredcars",getFeaturedCarsController);
router.get("/getBookedCars/:userid",protectRoute,  getBookedCarsController);
router.get("/getcarbyid/:id",getCarByIdController);
 router.post("/getcarbysearch",getCarBySearch);
 router.post("/getcarbypickreturn",getCarByPickeUpReturn);

router
export default router;