import React, { useEffect } from "react";

import { Eye, EyeOff, Loader, Trash2 } from "lucide-react";
import dashboaradStore from "../../store/dashboard";



function ManageCars() {
  const { GetCarList, carList, loading ,ToogleCarAvailability,loaddingId,RemoveCars,loadingSecond} = dashboaradStore();
  
  useEffect(() => {
    GetCarList();
  }, []);

   if(loading) return <div className='w-full h-full  flex justify-center items-center'><Loader size={35} className='animate-spin'/></div>
 
  return (
    <div className="py-6 px-5 overflow-y-auto overflow-x-hidden w-full flex flex-col">
      <h2 className="font-bold text-xl sm:text-2xl">Manage Cars</h2>
      <p className="text-gray-500">
        View all listed cars, update their details, or remove them from the
        booking platform
      </p>
      <div className=" max-w-5xl mt-10  flex-1  overflow-x-auto  ">
        <div className="scrollStyle relative max-h-full  overflow-y-auto border border-gray-500 rounded-sm">
          <table className="   w-full text-sm ">
            <thead className="sticky top-0 bg-white shadow-sm z-10 border-b">
              <tr >
                <th>Car</th>
                <th className="max-md:hidden">Category</th>
                <th>Price</th>
                <th className="max-md:hidden">Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {carList.length>0 && carList.map((val) => (
                <tr className="border border-gray-500 " key={val._id}>
                  <td className=" flex items-center gap-2">
                    <div className="h-15 w-15 flex-none">
                      <img
                        src={val.image}
                        alt=""
                        className="aspect-square object-cover h-full w-full rounded "
                      />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {val.brand} seats . {val.model}
                      </p>
                      <p className="text-sm text-gray-500">
                        {val.seatingcapacity} seats .{" "}
                        {val.transmission}
                      </p>
                    </div>
                  </td>
                  <td className=" p-2.5 max-md:hidden">{val.catagory}</td>
                  <td className=" p-2.5">${val.dailyprice}/Day</td>
                  <td className="max-md:hidden">
                    {" "}
                    <p
                      className={`text-sm py-1 px-2 flex justify-center items-center ${
                        val.availabilitystatus
                          ? "bg-green-100 text-green-600  rounded-full"
                          : "bg-red-100 text-red-600  rounded-full"
                      }`}
                    >
                      {val.availabilitystatus ? "Available" : "Not Available"}
                    </p>
                  </td>
                  <td>
                    <div className="flex gap-3 justify-between">
                      
                     {loaddingId==val._id ? <Loader size={18} className="animate-spin"/> : val.availabilitystatus ? <EyeOff size={18} className="cursor-pointer"  onClick={()=>ToogleCarAvailability(val._id)}/> :  <Eye size={18} className="cursor-pointer" onClick={()=> ToogleCarAvailability(val._id)}/>}
                      
                      {loadingSecond==val._id ? <Loader size={18}  className="animate-ping" /> : <Trash2 size={18} className="cursor-pointer" onClick={()=>RemoveCars(val._id)}/>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageCars;
