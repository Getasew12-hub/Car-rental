
import { bookingCarList } from "../modal/bookingCarList.js";
import { carList } from "../modal/carList.js";

async function checkBookingAvailablity(car,bookingDate,returnDate){
    const checkCar=await bookingCarList.find({car,bookingDate:{$lte:returnDate},returnDate:{$gte:bookingDate}});
      
    return checkCar.length==0;


}


export const getCarListController=async (req,res) => {
    try {
        const {page=1}=req.query;
       const getCars=await carList.find({availabilitystatus:true}).skip((page-1)*10).limit(10).sort({createdAt:-1});
       const totalCar=await carList.countDocuments({availabilitystatus:true});
       const totalPage=Math.ceil(totalCar/10);



    
         
        return res.status(200).json({carlist:getCars,totalPage});
    } catch (error) {
       console.log("error on getcar list contorller",error.message);
        return res.status(500).json({error:"Internal server error"});  
    }
}

export const getFeaturedCarsController=async (req,res) => {
    try {
        const getCars=await carList.find({featuredcars:true}).limit(6).sort({createdAt:-1});
        if(getCars.length==0){
            const getAllCars=await carList.find({availabilitystatus:true}).limit(6).sort({createdAt:-1});
            return res.status(200).json(getAllCars);
        }
        return res.status(200).json(getCars);
    } catch (error) {
         console.log("error on get featured car contorller",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}

export const getCarBySearch=async (req,res) => {
    try {
        const {search}=req.body;
        const {page=1}=req.query;
       
        if (+search) {
        const getCarByDate=await carList.find({year:+search,availabilitystatus:true}).skip((page-1)*10).limit(10).sort({createdAt:-1});
        const totalCar=await carList.countDocuments({year:+search,availabilitystatus:true});
        const totalPage=Math.ceil(totalCar/10);
        
        return res.status(200).json({carlist:getCarByDate,totalPage});
    }
  
        const getCars=await carList.find({$or:[
            {brand:{$regex:search,$options: 'i'}},
            {catagory:{$regex:search,$options: 'i'}},
             {model:{$regex:search,$options: 'i'}},
             {location:{$regex:search,$options: 'i'}},
             
             
        ]}).skip((page-1)*10).limit(10).sort({createdAt:-1});
    
        const totalCar=await carList.countDocuments({$or:[
                            {
                                brand:{$regex:search,$options: 'i'}
                            },
                            {
                                catagory:{$regex:search,$options: 'i'}
                            },
                            {
                                model:{$regex:search,$options: 'i'}
                            },
                            {
                                location:{$regex:search,$options: 'i'}
                            },
                            
                            
                        ]});
        const totalPage=Math.ceil(totalCar/10);

                            


      
        return res.status(200).json({carlist:getCars,totalPage});
    } catch (error) {
       console.log("error on getcarby search contorller",error.message);
        return res.status(500).json({error:"Internal server error"});  
    }
}

export const getCarByPickeUpReturn=async (req,res) => {
    try {
        const {location,bookingDate,returnDate}=req.body;
      
        const getAllCars=await carList.find({location:{$regex:location,$options: 'i'}});
        
        const getFilterCars=getAllCars.map(async(car)=>{
            const check=await checkBookingAvailablity(car._id,bookingDate,returnDate);
             if(!check) return;

             return car;
        })

        const CarLists=await Promise.all(getFilterCars);
      
        return res.status(200).json(CarLists.filter(car=>car!=undefined));
        
    } catch (error) {
               console.log("error on getCarBy pick and return contorller",error.message);
        return res.status(500).json({error:"Internal server error"});  
    }
}

export const getCarByIdController=async (req,res) => {
    try {
        const {id}=req.params;
        const getCar=await carList.findById(id);
        return res.status(200).json(getCar);
    } catch (error) {
            console.log("error on getcar by id contorller",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}

export const searchWordController=async (req,res) => {
    try {
        const getAllCars=await carList.find({});
        const searchWord=getAllCars.map((val)=>{
            return [
                val.brand.toLowerCase(),
                val.catagory.toLowerCase(),
                val.model.toLowerCase(),
                val.location.toLowerCase(),
                val.year.toString() 
            ];
        });
        const uniqueSearchword=[...new Set(searchWord.flat())];
        return res.status(200).json(uniqueSearchword);
    } catch (error) {
           console.log("error on search word contorller",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}


export const getBookedCarsController=async (req,res) => {
    try {
        const {_id}=req.user;
        const getBookedCars=await bookingCarList.find({user:_id}).populate('car');
        return res.status(200).json(getBookedCars);
    } catch (error) {
            console.log("error on get booked car contorller",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}


