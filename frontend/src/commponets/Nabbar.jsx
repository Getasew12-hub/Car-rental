import React, { useEffect, useRef, useState } from 'react'
import {Link} from "react-router-dom"
import {Menu, Search, X} from "lucide-react"


import userStore from '../store/user'
import { motion } from "motion/react"


function Nabbar({showLogin}) {
  const mobileview=useRef();
  const {user,LogoutUser}=userStore()
 
  const [mobileOpen,setMobileopen]=useState(false)
       const currentUrl = window.location.pathname;
     useEffect(()=>{
      document.addEventListener("mousedown",(e)=>{
          if(!mobileview.current.contains(e.target)){
            
            setMobileopen(false);
          }
        
      
      })
     })
  const background=currentUrl=='/' ? "bg-gray-100": "bg-white"
 
  const addmin=user?.role=="admin";
  return (
    <motion.div 
    initial={{ y: -100,opacity:0 }}
    animate={{ y: 0,opacity:1 }}
    transition={{ duration: 0.5 }}

    className='fixed w-full z-50'>

    <div className={`shadow shadow-gray-400 ${background}  `}>

      <div className='flex  justify-between max-w-7xl items-center overflow-hidden p-3 mx-auto'>

        <div>
          <Link to={"/"}><img src={"/logo.svg"} alt="website logo" /></Link>
        </div>
        <div className=' hidden md:flex justify-center items-center gap-5  '>
          <Link to={"/"} className='hover:underline underline-offset-4'>Home</Link>
          <Link to={"/car-list"} className='hover:underline underline-offset-4' >Cars</Link>
        {user &&  <Link to={"/my-booking"} className='hover:underline underline-offset-4' >My booking</Link>}
         
            
          

         {addmin && <Link to={"/admin-dashbord/dashbord"} className='hover:underline underline-offset-4'>Dashbord</Link>}
           {user ? (
            <button className='buttonstyle bg-gray-500/80!' onClick={LogoutUser}>Logout</button>
           ) :(
          <button className='buttonstyle' onClick={()=> showLogin(true)}>Login</button>
           )}
           
        </div>
        <button className='cursor-pointer md:hidden' onClick={()=> setMobileopen(!mobileOpen)}>
        {mobileOpen ? (<X/>) :(<Menu size={20}/>)}  
        </button>
      </div>

      
    </div>

    {/* mobile menu */}
  
            <div className={`fixed bottom-0 w-2/3 bg-white right-0 flex flex-col top-14 items-start p-3 gap-5 border-l border-t border-gray-400 ${background} md:hidden ${mobileOpen ? "translate-0": "translate-x-full"} transition-all duration-300`} ref={mobileview}>
          <Link to={"/"} onClick={()=> setMobileopen(false)} className='hover:underline underline-offset-4'>Home</Link>
          <Link to={"/car-list"} onClick={()=> setMobileopen(false)}  className='hover:underline underline-offset-4' >Cars</Link>
        {user && <Link to={"/my-booking"}  onClick={()=> setMobileopen(false)}  className='hover:underline underline-offset-4' >My booking</Link>}
       
         

         {addmin && <Link to={"/admin-dashbord/dashbord"}  onClick={()=> setMobileopen(false)}  className='hover:underline underline-offset-4'>Dashbord</Link>}
           {user ? (
            <button className='buttonstyle bg-gray-500/80!' onClick={()=>{
               setMobileopen(false) 
              LogoutUser()
            }
            }>Logout</button>
           ) :(
          <button className='buttonstyle' onClick={()=>{
               setMobileopen(false) 
              showLogin(true)
            }
            }>Login</button>
           )}
           
        </div>

        
  
    </motion.div>
    
  )
}

export default Nabbar