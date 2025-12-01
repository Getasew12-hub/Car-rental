import { carList } from "../modal/carList.js";
import { bookingCarList } from "../modal/bookingCarList.js";
import { v2 as cloudinary } from 'cloudinary';


export const dashboardController=async(req,res)=>{
    try {
        const totalCar=await carList.estimatedDocumentCount();
         const totalBooking=await bookingCarList.estimatedDocumentCount();

         const pendingBooking=await bookingCarList.countDocuments({status:"pending"});
         const completeBooking=await bookingCarList.countDocuments({status:"confirmed"});
         
           const date = new Date(); // Gets the current date and time
                date.setDate(date.getDate() - 7);

         const recentBooking=await bookingCarList.find({createdAt:{$gte:date}}).populate("car","brand createdAt dailyprice").limit(10).sort({createdAt:-1});

         const monthDate=new Date();

           monthDate.setDate(monthDate.getDate()-30);

           const monthBooking=await bookingCarList.aggregate([ 
            {
                $match:{createdAt:{$gte:monthDate},status:"confirmed"}
            
            },
            {
            $group:{
                _id:null,
                totalPrice:{$sum:"$price"}
            }
            }

           ]);
     
           
           


        return res.status(200).json({
            totalCar,
            totalBooking,
            pendingBooking,
            completeBooking,
            recentBooking,
            monthtotalRevnue:monthBooking.length>0 ? monthBooking[0].totalPrice :0,
        })

    } catch (error) {
        console.error("Error in dashboard controller",error.message);
        return res.status(500).json({error:"Internal server error in dashboard controller"});
        
    }

}

export const addCarController=async (req,res) => {
    try {
    
     let {image}=req.body;


     const requiredvalue=req.body;

     const checkAllavailable=Object.values(requiredvalue).every(val=>
        val==null || val==undefined || val==''
     )

     if(image){
       const uploadimage= await cloudinary.uploader.upload(image,{
        folder:"CarRental",
        width: 800,
      crop: 'scale',

      quality: 70, 
      fetch_format: 'auto'
    });
         image=uploadimage.secure_url;
     }

     if(checkAllavailable) return res.status(404).json({error:"All input is required"});

     const newCar=await carList.create({...requiredvalue,image})
 return res.status(200).json({...newCar._doc});

    } catch (error) {
        console.error("Error in addcar  controller",error);
        return res.status(500).json({message:"Internal server error in dashboard controller"}); 
    }
}

export const carListController=async (req,res) => {
   
    try {
        const getCars=await carList.find().sort({createdAt:-1});

        return res.status(200).json(getCars)
        
    } catch (error) {
         console.error("Error in dashboard controller",error.message);
        return res.status(500).json({message:"Internal server error in Carlist  controller"}); 
    }
}

export const getBookingController=async (req,res) => {
    try {

    const getBookings=await bookingCarList.find({}).sort({createdAt:-1}).populate("car","brand model image dailyprice location");
            
     return res.status(200).json(getBookings)
        
    } catch (error) {
        console.error("Error in dashboard controller",error.message);
        return res.status(500).json({message:"Internal server error in get booking car  controller"}); 
        
    }
}
export const toggleCarAvailablity=async (req,res) => {
    try {

     const {id}=req.params;

     const getCars=await carList.findById(id);
    
       getCars.availabilitystatus=getCars.availabilitystatus? false :true;
     
      await getCars.save();
      return res.status(201).json({...getCars._doc});
        
    } catch (error) {
        console.error("Error in dashboard controller",error.message);
        return res.status(500).json({message:"Internal server error in update car  controller"}); 
        
    }
}

export const updateBookingController=async (req,res) => {
    try {

     const {id}=req.params;
   const {status}=req.body;
     const getCars=await bookingCarList.findByIdAndUpdate(id,{status},{new:true});

      

     
      return res.status(201).json({...getCars._doc});
        
    } catch (error) {
        console.error("Error in dashboard controller",error.message);
        return res.status(500).json({message:"Internal server error in update booking car  controller"}); 
        
    }
}
export const deleteCarController=async (req,res) => {
    try {

     const {id}=req.params;
     const checkCarBooking=await bookingCarList.findOne({car:id,status:"pending"});

     if(checkCarBooking) return res.status(400).json({error:"Cannot delete car with pending bookings"});

  
       await carList.findByIdAndDelete(id);

      return res.status(201).json({message:"Successfully detelete"});
        
    } catch (error) {
        console.error("Error in dashboard controller",error.message);
        return res.status(500).json({error:"Internal server error in update booking car  controller"}); 
        
    }
}

export const toggleFeaturedCar=async (req,res) => {
    try {
        const {id}=req.params;
        const getCars=await carList.findById(id);
        getCars.featuredcars=getCars.featuredcars ? false : true;
        await getCars.save();
        return res.status(201).json({...getCars._doc});
    } catch (error) {
        console.error("Error in toggle featured car controller",error.message);
        return res.status(500).json({error:"Internal server error in toggle featured car controller"});
    }
}


