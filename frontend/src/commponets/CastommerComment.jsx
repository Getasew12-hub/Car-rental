import { Star } from 'lucide-react'
import React from 'react'
import { motion } from 'motion/react'
function CatommerComment() {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
     className='text-center space-y-10 py-20'>
      <motion.h1
      initial={{ y: 50,opacity:0 }}
      whileInView={{ y: 0,opacity:1 }}
      transition={{ duration: 0.5 }}
       className='font-bold text-xl sm:text-2xl lg:text-4xl'>What Our Customer Say</motion.h1>
      <p className='max-w-xl mx-auto text-gray-500'>Descover why discerning travelers choose StayVenture for thier luxury accoummodations around the world.</p>
        <motion.div
      initial={{ y: 50,opacity:0 }}
      whileInView={{ y: 0,opacity:1 }}
      transition={{ duration: 0.5 ,delay:0.2}}

         className='grid  p-8 sm:p-0 sm:grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-3.5 w-full' >
      {[...Array(3)].map((val,index)=>
      <motion.div
      initial={{ y: 50,opacity:0 }}
      whileInView={{ y: 0,opacity:1 }}
      transition={{ duration: 0.5 ,delay:0.4}}
      key={index}
       className='shadow-lg shadow-gray-500 p-3.5 rounded-md  space-y-2.5' >
      <div className='flex items-center gap-2 ' >
        <div className='flex justify-center items-center sm:h-14 sm:w-14 h-10 w-10 rounded-full overflow-hidden bg-black text-white font-bold'> {val?.image ? (<img src="" alt="" />):("n".charAt(0).toUpperCase())} </div>
        <div> 
          <p className='font-medium text-xl max-sm:text-[12px]'>Emma Rodriguez</p>
          <p className='text-gray-400 max-sm:text-[11px]'>Barcelona, Spain</p>
        </div>
      </div>

      <div className='flex items-center gap-2 text-blue-700'>
        {[...Array(5)].map((_,index)=>
        <Star fill='blue' size={15} key={index}/>
        )}
        
       
      
      </div>

      <p className='text-gray-500 font-medium max-sm:text-sm'>"I've rented cars from various companies, but the experience with CarRental was exceptional."</p>
      </motion.div>)}
      </motion.div>


 
    </motion.div>
  )
}

export default CatommerComment