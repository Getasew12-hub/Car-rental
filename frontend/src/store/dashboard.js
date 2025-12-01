import { create } from "zustand";
import axios from "../middleware/axios";
import toast from "react-hot-toast";


const dashboaradStore=create((set,get)=>({
    loading:false,
    dashboardData:[],
    bookingCars:[],
    carList:[],
    loaddingId:null,
    loadingSecond:null,

    FeatchDashboardData:async () => {
        set({loading:true});
        try {
            const response=await axios.get("/admin/dashboard");

            set({dashboardData:response.data});
            
        } catch (error) {
            console.log("error on feach dashboard data",error);
            set({dashboardData:[]});
            
        }finally{
            set({loading:false})
        }
    },
    CreateCars:async(requiredvalue)=>{
        set({loading:true});
        try {

            await axios.post("/admin/addcar",requiredvalue);
            toast.success("Car created successfully");
            return true;
        }catch (error) {
            console.log("error on create car",error);
            toast.error("Failed to create car");
            return false;
        }finally{
            set({loading:false})
        }
    },
    GetCarList:async()=>{
        set({loading:true});
        try {
            const response=await axios.get("/admin/carslist");
            
            set({carList:response.data});
        } catch (error) {
            console.log("error on get car list",error);
            set({carList:[]});
        }finally{
            set({loading:false})
        }
    },
    GetBookingCars:async()=>{
        set({loading:true});
        try {
            const response=await axios.get("/admin/getBooking");
            set({bookingCars:response.data});
        } catch (error) {
            console.log("error on get booking car list",error);
            set({bookingCars:[]});
        }finally{
            set({loading:false})
        }
    },

    ToogleCarAvailability:async(id)=>{
        set({loaddingId:id});
    
        try {
           
            const response=await axios.patch(`/admin/toggleCarAvailablity/${id}`);
           
            const {carList}=get();

         
            
            const updatedCarList=carList.map((car)=>{
               
                if(car._id===id){
                    return {...car,availabilitystatus:response.data.availabilitystatus};
                }  
                return car;
            });
           
            set({carList:updatedCarList});
            toast.success("Car availability status updated");
        } catch (error) {
            console.log("error on toggle car availability",error);
            toast.error("Failed to update car availability status");
        }finally{
              
                
                    set({loaddingId:null});
           
        }
    },

  RemoveCars:async(id)=>{
    set({loadingSecond:id});
    try {

        await axios.delete(`/admin/deletecar/${id}`);
        const {carList}=get();
        const updatedCarList=carList.filter((car)=>car._id!==id);
        set({carList:updatedCarList});
        toast.success("Car deleted successfully");
    } catch (error) {
        console.log("error on delete car",error);
        toast.error(error.response?.data?.error ||   "Failed to delete car");
    }finally{
        set({loadingSecond:null});
    }
    },

    UpdateBookingStatus:async(id,status)=>{
        set({loaddingId:id});
        try {
            const response=await axios.patch(`/admin/updatebooking/${id}`,{status});
            const {bookingCars}=get();
            const updatedBookingCars=bookingCars.map((booking)=>{
                if(booking._id===id){
                    return {...booking,status:response.data.status};
                }
                return booking;
            });
            set({bookingCars:updatedBookingCars});
            toast.success("Booking status updated");
        } catch (error) {
            console.log("error on update booking status",error);
            toast.error("Failed to update booking status");
        }finally{
            set({loaddingId:null});
        }
    },





}))

export default dashboaradStore;