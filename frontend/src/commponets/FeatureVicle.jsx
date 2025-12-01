import React from 'react'

import { ArrowBigRight, ArrowDownLeft, ArrowLeft, ArrowRight, Car, Fuel, Locate, MapPin, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import CardList from './CardList'
import { motion } from "motion/react";

function FeatureVicle({featureCars}) {
  
  const navigate=useNavigate()

  return (
    <motion.div
    initial={{ y: 50,opacity:0 }}
    whileInView={{ y: 0,opacity:1 }}
    transition={{ duration: 0.5 }}
    className='text-center py-2.5 space-y-5 mt-20'>
        <motion.h2
        initial={{ y: 50,opacity:0 }}
        whileInView={{ y: 0,opacity:1 }}
        transition={{ duration: 0.5,delay:0.2 }}
         className='font-bold text-2xl sm:text-4xl md:text-5xl '>Featured Vehicles</motion.h2>
        <motion.p 
        initial={{ y: 50,opacity:0}}
        whileInView={{ y: 0,opacity:1 }}
        transition={{ duration: 0.5 }}
        className='text-gray-500'>Explore our selection of premium vehicles available for your next adventure.</motion.p>
        <motion.div
        initial={{ y: 50,opacity:0}}
        whileInView={{ y: 0,opacity:1 }}
        transition={{ duration: 0.5 }}
         className='grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(230px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(270px,1fr))] mt-20 gap-5 sm:gap-10 w-full mx-auto space-y-7 items-start'>

        {featureCars.length>0 && featureCars.map((val)=> 
         
        <CardList val={val} key={val._id}/>
        )}

      
        </motion.div >
          <motion.button
          initial={{ y: 50,opacity:0}}
          whileInView={{ y: 0,opacity:1 }}
          transition={{ duration: 0.5,delay:0.7 }}
           onClick={()=>navigate("/car-list")} className='flex justify-center items-center cursor-pointer border border-gray-400 py-1 px-2.5 text-gray-500 rounded mx-auto my-16'>Exploare all cars <ArrowRight/></motion.button>
    </motion.div>
  )
}

export default FeatureVicle