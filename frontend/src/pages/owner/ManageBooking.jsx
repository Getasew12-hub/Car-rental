import React, { useEffect, useState } from 'react'

import dashboaradStore from '../../store/dashboard';
import { Loader } from 'lucide-react';

function ManageBooking() {
  const { bookingCars,loading,GetBookingCars,UpdateBookingStatus,loaddingId } = dashboaradStore();
  const [status,setStatus]=useState("")
  useEffect(() => {
    GetBookingCars();
  }, []);

  if(loading) return <div className='w-full h-full  flex justify-center items-center'><Loader size={35} className='animate-spin'/></div>



  function formDate(date){
 const datefromSting=new Date(date);

  return datefromSting.toLocaleDateString("en-US",{
    year:"numeric",
    month:"short",
    day:"2-digit",
   
 })


    }

  return (
 <div className="py-6 px-5 overflow-y-auto overflow-x-hidden w-full flex flex-col">
      <h2 className="font-bold text-xl sm:text-2xl">Manage Bookings</h2>
      <p className="text-gray-500">
        Track all customer bookings, approve or cancel requests,and manage booking statuses
      </p>
      <div className=" max-w-5xl mt-10  flex-1  overflow-x-auto  ">
        <div className="scrollStyle relative max-h-full  overflow-y-auto border border-gray-500 rounded-sm">
{bookingCars.length==0 ? <p className='p-4'>No bookings found</p>:

          <table className="   w-full text-sm ">
            <thead className="sticky top-0 bg-white shadow-sm z-10 border-b ">
              <tr >
                <th>Car</th>
                <th className="max-md:hidden">Date Range</th>
                <th>Total</th>
                
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookingCars.map((val) => (
                <tr className="border border-gray-500 " key={val._id}>
                  <td className=" flex items-center gap-2">
                    <div className="h-15 w-15 flex-none">
                      <img
                        src={val.car?.image}
                        alt=""
                        className="aspect-square object-cover h-full w-full rounded "
                      />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {val.car?.brand} seats . {val.car?.model}
                      </p>
                     
                    </div>
                  </td>
                  <td className=" p-2.5 max-md:hidden">{formDate(val.bookingDate)} To {formDate(val.returnDate)}</td>
                  <td className=" p-2.5">${val.price}</td>
               
                  <td>
                    
                      {val.status=="pending" ?
                       (<select name='status' defaultValue={val.status} className='inputStyle' onChange={(e)=>UpdateBookingStatus(val._id,e.target.value)}>
                        {loaddingId==val._id ? <option disabled>Updating...</option> : 
                        <>
                        <option value={"pending"}>Pending</option>
                           <option value={"cancel"}>Cancel</option>
                           <option value={"confirmed"}>Confirmed</option>
                        </>}
                           
                       </select>)
                      :(
                        <span className={`py-1 px-2.5 rounded-full ${val.status=='confirmed' ? "bg-green-100 text-green-500 " : "bg-red-100 text-red-500"}`}>
                             {val.status}
                        </span>
                      )
                      }
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>}
        </div>
      </div>
    </div>
  )
}

export default ManageBooking