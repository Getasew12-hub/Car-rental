import {create } from "zustand";
import axios from "../middleware/axios";
import toast from "react-hot-toast";


const carBookingStore=create((set,get)=>({
    bookedCarList:[],
    loading:false,
    GetBookedCarList:async()=>{
        set({loading:true});
        try {
            const response=await axios.get("/booking/getbooking");
            set({bookedCarList:response.data});
        } catch (error) {
            toast.error("Failed to fetch booked cars");
        }finally{
            set({loading:false});
        }
    },
    AddBookingCar:async (car,bookingDate,returnDate,priceperday) => {
        set({loading:true});
        try {
            
            const response=await axios.post("/booking/addBooking",{car,bookingDate,returnDate,priceperday});
            toast.success("Car booked successfully");
            set({bookedCarList:[response.data,...get().bookedCarList]});
            return true;
            
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to book the car");
            return false;
        }finally{
            set({loading:false});
        }
        
    }
}))

export default carBookingStore;

