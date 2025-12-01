import React, { useRef, useState } from "react";
import { ArrowDown, ChevronDown, Search } from "lucide-react";

import toast from "react-hot-toast";
import { Link ,useNavigate} from "react-router-dom";
import { motion } from "motion/react";
function header() {

  const navigate=useNavigate();
  const pickupdate = useRef();
  const returndata = useRef();
  const selection = useRef();
  const [changeTrack, setChangeTrack] = useState([]);
  const [searchdata, setSearchdata] = useState({
    location: "Addis abeba",
    pickupdate: "",
    returndata: "",
  });

  function dateFormate(val) {
    const date = new Date(val);
    const result = date.toLocaleString("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      timeZone: "UTC",
    });

    return result;
  }

  function searchHandler(e) {
    let { name, value } = e.target;
    if (name != "location") {
      
      const pickupdate = new Date(searchdata.pickupdate);
      const returndate = new Date(value);
      if (pickupdate > returndate && name == "returndata")
        return toast.error("Return date must be greater than pick date", {
          id: "one",
        });
    }
  

    setSearchdata((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  }

  function searchForm() {
    if(!searchdata.pickupdate || !searchdata.returndata) return toast.error("Please select pick up and return date",{id:"dateerror"});
    navigate(`/car-list?location=${searchdata.location}&pickupdate=${searchdata.pickupdate}&returndata=${searchdata.returndata}`);
     
  }
  return (
    <motion.header 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}

    className="flex justify-center items-center h-screen flex-col space-y-14 px-2.5 bg-gray-100 min-h-screen md:pt-20">
      <motion.h1
      initial={{ y: 50,opacity:0,scale:0.9 }}
      animate={{ y: 0,opacity:1,scale:1 }}
      transition={{ duration: 0.5 ,delay:0.2 }}
       className="font-bold text-2xl md:text-5xl">Luxury Cars on Rent</motion.h1>
      <motion.div
      initial={{ y: 50,opacity:0,scale:0.9 }}
      animate={{ y: 0,opacity:1,scale:1 }}
      transition={{ duration: 0.5,delay:0.4 }}
        className="bg-white shadow shadow-gray-400 py-2.5 px-4 md:py-4 md:px-8 flex flex-col max-w-xl  rounded-md  justify-between md:flex-row md:max-w-4xl w-full items-center md:rounded-full gap-5 md:gap-14
         "
      >
        <div className="flex justify-between items-center  w-full flex-wrap md:flex-nowrap">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="location"
              className="flex items-center"
              onClick={() => selection.current.showPicker()}
            >
              Pick Location <ChevronDown size={18} />
            </label>
            <select
              name="location"
              id="location"
              className={`appearance-none outline-0  text-gray-400`}
              ref={selection}
              onChange={searchHandler}
            >
              <option value="addisabeba">Addis abeba</option>
              <option value="bahirdar">Bahirdat</option>
              <option value="adama">Adama</option>
              <option value="hawassa">Hawassa</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 relative">
            <label
              htmlFor="pickupdate"
              className="flex items-center"
              onClick={() => pickupdate.current.showPicker()}
            >
              Pickup Date <ChevronDown size={18} />
            </label>
            <input
              type="date"
              name="pickupdate"
              id="pickupdate"
              ref={pickupdate}
              className="absolute invisible"
              onChange={searchHandler}
              min={new Date().toISOString().split("T")[0]}
            />
            <p
              className={`
                  text-gray-400`}
            >
              {searchdata.pickupdate && <span className="text-black">{dateFormate(searchdata.pickupdate)}</span>  || dateFormate(new Date())  }
            </p>
          </div>

          <div className="relative">
            <label
              htmlFor="returndata"
              className="flex items-center"
              onClick={() => returndata.current.showPicker()}
            >
              Return Date <ChevronDown size={18} />
            </label>
            <input
              type="date"
              name="returndata"
              id="returndata"
              className="absolute invisible"
              ref={returndata}
              onChange={searchHandler}
              min={new Date().toISOString().split("T")[0]}
            />
            <p
              className={` text-gray-400`}
            >
              { searchdata.returndata && <span className="text-black">{ dateFormate(searchdata.returndata)}</span> || dateFormate(new Date(new Date().setDate(new Date().getDate() + 1)))}
            </p>
          </div>
        </div>
        <button
          className="bg-blue-600 text-white p-2.5 flex justify-center items-center rounded-full gap-3.5 cursor-pointer   w-full md:w-fit "
          onClick={searchForm}
        >
          <Search /> Search
        </button>
      </motion.div>

      <motion.div 
      initial={{ y: 50,opacity:0,scale:0.9 }}
      animate={{ y: 0,opacity:1,scale:1 }}
      transition={{ duration: 0.5,delay:0.6 }}
       >
        <img
          src={"/main_car.png"}
          alt="main car"
          className="max-w-4xl w-full"
        />
      </motion.div>
    </motion.header>
  );
}

export default header;
