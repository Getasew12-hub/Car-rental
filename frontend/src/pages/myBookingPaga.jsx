import React, { useEffect } from 'react'
import BookingCarList from '../commponets/BookingCarList'

import bookingStore from "../store/carBooking"
import { Loader } from 'lucide-react'
import { motion } from "motion/react";

function myBookingPaga() {
const {GetBookedCarList,bookedCarList,loading}=bookingStore()

useEffect(()=>{
  GetBookedCarList();
},[])

if(loading){
  return <div className='pt-20 flex justify-center items-center w-full h-screen'>
    <Loader size={40} className='animate-spin'/>
  </div>
}


  return (
    <div className='pt-20 px-2.5 space-y-10 max-w-6xl mx-auto w-full'>
      <div>
      <motion.h2
      initial={{ y: 50,opacity:0 }}
      whileInView={{ y: 0,opacity:1 }}
      transition={{ duration: 0.5,delay:0.2 }}
       className='font-bold text-2xl md:text-3xl'>My Bookings</motion.h2>
      <motion.p
      initial={{ y: 50,opacity:0 }}
      whileInView={{ y: 0,opacity:1 }}
      transition={{ duration: 0.5,delay:0.3 }}
       className='text-gray-500 mt-2'>View and manage your car bookings</motion.p>
      </div>
      {bookedCarList.length===0 && <motion.p
      initial={{ y: 50,opacity:0 }}
      whileInView={{ y: 0,opacity:1 }}
      transition={{ duration: 0.5,delay:0.3 }}
       className='text-xl font-bold'>You have no bookings yet.</motion.p>}
    {bookedCarList.map((val)=>
    <BookingCarList  key={val._id} val={val}/>
    )} 
    </div>
  )
}

export default myBookingPaga