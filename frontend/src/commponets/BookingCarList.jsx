import React from 'react'
import {Calendar,  MapPin} from "lucide-react"
import { motion } from "motion/react";

function BookingCarList({val}) {
 

    function formDate(date){
 const datefromSting=new Date(date);

  return datefromSting.toLocaleDateString("en-US",{
    year:"numeric",
    month:"short",
    day:"2-digit",
   
 })


    }
  return (
    <motion.div
      initial={{ y: 50,opacity:0 }}
      whileInView={{ y: 0,opacity:1 }}
      transition={{ duration: 0.5,delay:0.5 }}

     className='border border-gray-400 rounded-md p-5 flex flex-col sm:flex-row gap-10 justify-between '>
     {/* left side bar */}
        <div className='flex gap-3.5 flex-col md:flex-row'>
            <div >
             <div className='max-w-64 w-full max-h-52 rounded-md overflow-hidden'>
            <img src={val?.car.image} alt="" className='rounded-md w-full h-auto object-cover aspect-video' />
            </div>
            <p className='font-bold'>{val.car.brand} {val.car.model}</p>
            <p className='text-gray-500'>{val.car.year} . {val.car.catagory} . {val.car.location}</p>

            </div>

            <div className='space-y-5'>
             <div className='flex gap-3.5'>
                 <p className='bg-gray-200 py-1 px-2.5 rounded-sm'>Booking #1</p>
                 <p className={` py-1 px-2.5 rounded-full ${val.status=="confirmed" ? "text-green-600 bg-green-100" :"text-red-500 bg-red-100"}`}>{val.status}</p>
             </div>

             <div className=' '>
                <p className='flex gap-2.5 text-gray-500 items-center'><Calendar size={16}  className='text-blue-500'/> Rental Period</p>
                <p className='font-medium pl-5'>{formDate(val.bookingDate)}---{formDate(val.returnDate)}</p>
             </div>
             <div>
                <p className='flex gap-2.5 text-gray-500 items-center'><MapPin size={16} className='text-blue-500' /> Pick-up Location</p>
                <p className='font-medium pl-5'>Airport Terminal 1</p>
             </div>
             <div>
              
                <p className='flex gap-2.5 text-gray-500 items-center'><MapPin size={16} className='text-blue-500'/> Return Location</p>
                <p className='font-medium pl-5'>Downtown Office</p>
             </div>
            </div>
        </div>

 {/* right side bar */}

 <div className='space-y-3 flex flex-col items-end'>
    <div>
    <p>Total Price</p>
    <p className='font-bold text-xl md:text-2xl text-blue-500'>${val.price}</p>
    <p>Booked on <span className='font-medium'>{formDate(val.createdAt)}</span></p>
    </div>
 </div>

    </motion.div>
  )
}

export default BookingCarList