import React from 'react'
import { Copyright, Facebook, Instagram, Mail, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from "motion/react"

function Footer() {
  return (
    <motion.div
      initial={{ y: 100,opacity:0 }}
      whileInView={{ y: 0,opacity:1 }}
      transition={{ duration: 0.5,delay:0.3 }}
     className='p-2.5 bg-gray-100  pt-40'>
        <div className='max-w-6xl mx-auto '>
        <div className='flex flex-col justify-between gap-10 lg:flex-row '>

            <div className='space-y-4'>
           <div> <img src={"/logo.svg"} alt="car rental logo" /></div>


           <p className='max-w-[400px] text-gray-500'>Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.</p>

           <div className='flex items-center gap-2.5 text-gray-500'>
            <Facebook />
            <Instagram/>
            <X/>
            <Mail/>
           </div>
        </div>


           <div className='grid grid-cols-2 gap-5 md:grid-cols-3' id='footer'>
             <div className='flex flex-col gap-2.5'>
                <h2 className='font-bold '>QUICK LINKS</h2>
                <Link to={"#"}>Home</Link>
                <Link to={"#"}>Browse Cars</Link>
                <Link to={"#"}>List Your Car</Link>
                <Link to={"#"}>About Us</Link>
             </div>
             <div className='flex flex-col gap-2.5'>
                <h2 className='font-bold'>RESOURCES</h2>
                <Link to={"#"}>Help Center</Link>
                <Link to={"#"}>Terms of Service</Link>
                <Link to={"#"}>Privacy Policy</Link>
                <Link to={"#"}>Insurance</Link>
             </div>
             <div className='flex flex-col gap-2.5'>
                <h2 className='font-bold'>CONTACT</h2>
                <Link to={"#"}>1234 Luxury Drive</Link>
                <Link to={"#"}>San Francisco,CA  94107</Link>
                <Link to={"#"}>+1(155)123-4567</Link>
                <Link to={"#"}>Car@example.com</Link>
             </div>


           </div>
        </div>

        <div className='flex justify-between items-center gap-3.5 flex-wrap mt-6 border-t border-gray-600 py-3 text-gray-500'>
            <div className='flex items-center gap-2'>
              <Copyright/>  
              2025 CarRental.All rights reserved
            </div>

            <div className='flex items-center gap-2.5 '>
                <Link to={"#"}>Terms</Link> <span>|</span>
                <Link to={"#"}>Privacy</Link><span>|</span>
                <Link to={"#"}>Cookies</Link>
            </div>
        </div>
        </div>
    </motion.div>
  )
}

export default Footer