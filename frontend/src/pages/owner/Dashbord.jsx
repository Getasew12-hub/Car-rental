import React, { use, useEffect } from 'react'

import { Car, Loader, NotepadText, TriangleAlert } from 'lucide-react'
import dashboaradStore from '../../store/dashboard';

function Dashbord() {
    const {FeatchDashboardData,dashboardData,loading}=dashboaradStore();
    const [recentBooking,setRecentBooking]=React.useState([]);
    useEffect(() => {   
        FeatchDashboardData();
    }, []);

useEffect(() => {
    if(dashboardData?.recentBooking){
        setRecentBooking(dashboardData.recentBooking);
    }   
}, [dashboardData]);

        function formDate(date){
 const datefromSting=new Date(date);

  return datefromSting.toLocaleDateString("en-US",{
    year:"numeric",
    month:"short",
    day:"2-digit",
   
 })


    }
    if(loading) return <div className='w-full h-full  flex justify-center items-center'><Loader size={35} className='animate-spin'/></div>
  return (
    <div className='pt-6 px-5 flex-1 max-w-5xl  overflow-y-auto h-full pb-10 scrollhiden'>
        <h2 className='font-medium text-xl sm:text-2xl'>Admin Dashboard</h2>
        <p className='text-gray-500'>Monitor overall platform performance including total cars,bookings,revenue,and recent activities</p>

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-8'>
         <div className='cardStyle'>
            <div>
                <p>Total Cars</p>
                <p className='font-bold'>{dashboardData?.totalCar}</p>
            </div>
            <div>
                <Car className='text-blue-500'/>
            </div>
         </div>
         <div className='cardStyle'>
            <div>
                <p>Total Bookings</p>
                <p className='font-bold'>{dashboardData?.totalBooking}</p>
            </div>
            <div>
               <NotepadText  className='text-blue-500'/>
            </div>
         </div>
         <div className='cardStyle'>
            <div>
                <p>Pending Bookings</p>
                <p className='font-bold'>{dashboardData?.pendingBooking}</p>
            </div>
            <div>
            <TriangleAlert  className='text-blue-500'/>
            </div>
         </div>
         <div className='cardStyle'>
            <div>
                <p>Complete Bookings</p>
                <p className='font-bold'>{dashboardData?.completeBooking}</p>
            </div>
            <div>
                <NotepadText className='text-blue-500'/>
            </div>
         </div>
        </div>



        <div className='flex flex-wrap gap-5 mt-10'>

            <div className='border border-gray-500 rounded p-3.5 md:min-w-96  max-w-96 w-full' >
                <p className='font-medium'>Recent Bookings</p>
                <p className='text-gray-400 mb-8'>Lates customer bookings</p>
             
             {recentBooking.length>0 &&   recentBooking.map((val,index)=>
             <div className='flex justify-between gap-3.5  mb-4 items-center' key={index}> 
              <div className='flex items-center gap-3'> 
                <p className='h-10 w-10 bg-blue-100 flex justify-center items-center rounded-full  text-blue-500'><NotepadText size={18}/> </p>
                <div>
                    <p className='font-semibold text-[14px]'>{val.car?.brand} {val.car?.model}</p>
                <p className='text-gray-500 text-[14px]'>{formDate(val.bookingDate)}</p>

                </div>
                </div> 

                <div className='flex items-center gap-3'>
                    <p className='font-semibold text-[14px]'>${val.price}</p>
                    <p className='border border-gray-400 px-2 py-0.5 rounded-full text-[14px]'>{val.status}</p>
                </div>
             
             </div>
            )}
            </div>


            <div className='border border-gray-500 rounded p-3.5 h-max min-w-fit'>
                <p className='font-bold text-xl '>Monthly Revenue</p>
                <p className='text-gray-500'>Revenue for current month</p>

                <p className='mt-8 mb-3.5 font-bold text-2xl text-blue-500'>${dashboardData?.monthtotalRevnue}</p>
            </div>
        </div>
    </div>
  )
}

export default Dashbord