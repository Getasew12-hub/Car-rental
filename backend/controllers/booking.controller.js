import { bookingCarList } from "../modal/bookingCarList.js";
import { carList } from "../modal/carList.js";

async function checkBookingAvailablity(car,bookingDate,returnDate){
    const checkCar=await bookingCarList.find({car,bookingDate:{$lte:returnDate},returnDate:{$gte:bookingDate}});

    return checkCar.length==0;


}


export const getBookingController=async (req,res) => {
    try {
        const {_id}=req.user;

        const getBookingDate=await bookingCarList.find({user:_id}).populate('car').sort({createdAt:-1});

        return res.status(200).json(getBookingDate);
    } catch (error) {
        console.log("error on getbooking contorller",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}


export const addBookingController=async (req,res) => {
    try {
        const {_id}=req.user;
        const {car,bookingDate,returnDate,priceperday}=req.body;
        

        const chcekAvailablity=await checkBookingAvailablity(car,bookingDate,returnDate);
        if(!chcekAvailablity){
            return  res.status(400).json({error:"Car is not available for the selected dates"});
        }

        const start = new Date(bookingDate);
        const end = new Date(returnDate);

        const DateTime=Math.abs(end-start);
        
        const daynumber=Math.ceil(DateTime/(1000*60*60*24));
      
        const price=daynumber==0 ? priceperday :parseFloat(priceperday)*daynumber;
      
       
        const newbooking={
            car,
            bookingDate,
            returnDate,
            price
        };

        
        const creatNewBooking=await bookingCarList.create({...newbooking,user:_id});

        
        return res.status(200).json({...creatNewBooking._doc});
    } catch (error) {
        console.log("error on addbooking contorller",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}

