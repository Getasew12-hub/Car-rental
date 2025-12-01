import React, { useEffect, useRef, useState } from 'react'
import Header from '../commponets/header'
import FeatureVicle from '../commponets/FeatureVicle'
import Banner from '../commponets/banner'
import CastomerComment from '../commponets/CastommerComment'
import Subscribe from '../commponets/Subscribe'
import Footer from '../commponets/Footer'
import { Link } from 'react-router-dom'
import carStore from "../store/car"
import { Loader } from 'lucide-react'

function homePage() {
  const {GetFeaturedCars,loading,featureCars}=carStore();
  useEffect(()=>{
    GetFeaturedCars();
  },[])

  if(loading) {
    return <div className='flex justify-center items-center h-screen'>
      <Loader className='animate-spin' size={40}/>
    </div>
  }

  return (
    <div className=''>
       
        <Header/>
      
      <div className='max-w-6xl mx-auto w-full  pb-16 px-2.5'>
   
    <FeatureVicle featureCars={featureCars}/>
  <Banner/>
  
<CastomerComment/>

<Subscribe/>
      </div>

    
      
    </div>
  )
}

export default homePage