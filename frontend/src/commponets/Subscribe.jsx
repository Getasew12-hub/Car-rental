import React, { useState } from 'react'
import { motion } from "motion/react"

function Subscribe() {
    const [emailaddress,setEmailaddress]=useState("");

    function hadleEmail(e){
       e.preventDefault();
      
       setEmailaddress("")
    }
  return (
    <motion.div
    initial={{ y: 50,opacity:0 }}
    whileInView={{ y: 0,opacity:1 }}
    transition={{ duration: 0.5,delay:0.3 }}
     className='space-y-8  text-center mt-10'>
        <div>

        <h1 className='font-medium text-2xl mb-3.5 md:font-bold md:text-3xl'>Never Miss a Deal!</h1>
        <p className='text-gray-500'>Subscribe to get the latest offers, new collections, and exclusive discounts.</p>
        </div>
       <form onSubmit={hadleEmail}>

        <div className='flex flex-col gap-2.5 sm:gap-0 max-w-2xl mx-auto sm:flex-row items-center justify-center '>
            <input type="email" name="email" id="email" placeholder='Enter your email address'  className='flex-1 rounded-l p-2 outline-0 border border-gray-500 w-full md:p-3' value={emailaddress} onChange={(e)=> setEmailaddress(e.target.value)} required/>

          <button className='py-2 px-3 cursor-pointer bg-blue-600 text-white rounded-r border border-blue-600 md:py-3'>Subscribe Now</button>
        </div>
       </form>


    </motion.div>
  )
}

export default Subscribe