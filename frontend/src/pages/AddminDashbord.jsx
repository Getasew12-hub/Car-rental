import React, { useEffect, useRef, useState } from 'react'
import Dashbord from './owner/Dashbord'
import AddCars from './owner/AddCars'
import ManageBooking from './owner/ManageBooking'
import ManageCars from './owner/ManageCars'
import {useNavigate, useParams} from "react-router-dom"
// import logo from "/logo.svg";
import { Car, CirclePlus, LayoutDashboard, Menu, NotepadText, X } from 'lucide-react'

function AddminDashbord() {
    const leftsidebar=useRef()
    const [menuOpen,setMenu]=useState(false)
    const urlnavigate=useNavigate();
    const {navigate}=useParams();

    useEffect(()=>{
 document.addEventListener("mousedown",(e)=>{
   
    if(!leftsidebar.current?.contains(e.target) && menuOpen){
     setMenu(false)
     
    }
 })
    },[menuOpen])

    function HanldeNavigation(val){
      urlnavigate(`/admin-dashbord/${val}`);
      {menuOpen && setMenu(false)};
    }

  return (
    <div className='flex pt-12 h-screen overflow-hidden border'>
        {/* left */}
        <Menu onClick={()=>setMenu(true)} className='md:hidden fixed top-14 bg-blue-100 rounded cursor-pointer text-blue-500 '/>
        <div className={`space-y-5 border-r pt-8 border-gray-500 min-w-56 w-56 lg:w-64 fixed xl:w-72  md:relative top-10 bottom-0 bg-white ${!menuOpen ? "-translate-x-full " :"translate-x-0"} transition-all duration-150 md:translate-0 md:top-0` } ref={leftsidebar}>
            <div className='px-2 xl:px-10 flex justify-between'>
                <img src="/logo.svg" alt="website logo" className='w-28 ' />
                <X onClick={()=>setMenu(false)} size={18} className='cursor-pointer md:hidden'/>
            </div>
           

           <div className='flex flex-col gap-2.5'>
            <button onClick={()=>HanldeNavigation("dashbord")} className={`sidebarbtton ${navigate=="dashbord" ? "bg-blue-100 text-blue-500" :"text-gray-500"}`}><LayoutDashboard size={18}/> Dashboard</button>
            <button onClick={()=>HanldeNavigation("addcars")} className={`sidebarbtton ${navigate=="addcars" ? "bg-blue-100 text-blue-500" : "text-gray-500"}`}><CirclePlus size={18}/> Add Car</button>
            <button onClick={()=>HanldeNavigation("managecars")} className={`sidebarbtton ${navigate=="managecars" ? "bg-blue-100 text-blue-500" : "text-gray-500"}`}><Car size={18}/> Manage Cars</button>
            <div onClick={()=>HanldeNavigation("mnagebooking")} className={` ${navigate=="mnagebooking" ? "bg-blue-100 text-blue-500" :"text-gray-500"}  sidebarbtton `}><NotepadText size={18}/> Manage Bookings</div>
           </div>
        </div>


        {/* right */}

        <div className=' flex overflow-hidden w-full'>
            {navigate=="dashbord" && <Dashbord/>}
           {navigate=="addcars" &&<AddCars/>}
            {navigate=="managecars" && <ManageCars/>}
            {navigate=="mnagebooking" && <ManageBooking/>}
        </div>
    </div>
  )
}

export default AddminDashbord