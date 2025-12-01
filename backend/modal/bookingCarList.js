import mongoose from "mongoose";

const carListSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,

    },
    car:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CarList",
        required:true,
    }
    ,
  bookingDate:{
        type:Date,
        required:true,
  },
  returnDate:{
        type:Date,
        required:true,  
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending","confirmed","cancelled"],
    },
    price:{
        type:Number,
        required:true,
    }

},{timestamps:true});
export const bookingCarList=mongoose.model("BookingCarList",carListSchema);