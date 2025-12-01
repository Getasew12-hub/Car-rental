import mongoose from "mongoose";

const carListSchema=new mongoose.Schema({
    brand:{
        type:String,
        required:true,
    },
    model:{
        type:String,
        required:true,
    },
    year:{
        type:Number,
        required:true,
        length:4,
    },
    dailyprice:{
        type:Number,
        required:true,
    },
    catagory:{
        type:String,
        required:true,
    },
    transmission:{
        type:String,
        required:true,
    },
    fueltype:{
        type:String,
        required:true,
    },
    seatingcapacity:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        required:true,  
    },
    image:{
        type:String,
        required:true,

    },
    discription:{
        type:String,
        default:"",

    },
    availabilitystatus:{
        type:Boolean,
        default:true,
    },
    featuredcars:{
        type:Boolean,
        default:false,
    },
},{timestamps:true});


export const carList=mongoose.model("CarList",carListSchema);

