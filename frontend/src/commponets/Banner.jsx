import React from 'react'

import { motion } from "motion/react"

function Banner() {
  
  return (
    <motion.div
    initial={{ y: 50,opacity:0, }}
    whileInView={{ y: 0,opacity:1 }}
    transition={{ duration: 0.5 }}
     className='w-full py-2.5 px-3.5 bg-linear-to-r from-blue-600 to-blue-200 text-white flex flex-col justify-center items-center rounded-lg text-center gap-20 lg:flex-row lg:py-10  lg:text-start lg:items-start lg:justify-between overflow-x-hidden'>
      <div className='flex-1'>


      <h1 className='font-bold text-2xl mb-2.5 md:text-3xl md:mb-3.5 lg:text-4xl lg:mb-5'>Do You Own a Luxury Car?</h1>

      <p className='max-w-[450px] '>Monetizer your vehicles effortless by list it on CarRental. we take care or insurance ,driver verification,and secure payments - so you can earn passive income,stress-free. </p>

      <button className='bg-white py-1.5 px-2.5 rounded-sm text-blue-500 cursor-pointer mt-3.5'>List your car</button>
      </div>

      <motion.div
      initial={{ x: 50,opacity:0 }}
      whileInView={{ x: 0,opacity:1 }}
      transition={{ duration: 0.5 ,delay:0.4}}
     
      >
        <img src={"/banner_car_image.png"} alt="banner car image"  className='max-h-35 h-full sm:max-h-48 '/>
      </motion.div>
    </motion.div>
  )
}

export default Banner