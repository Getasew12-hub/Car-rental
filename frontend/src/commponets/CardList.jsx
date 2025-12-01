import { Car, Fuel, MapPin, Users } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import carStore from "../store/car";
import { motion } from "motion/react";

function CardList({ val }) {
  const { setSelectedCar } = carStore();

  const navigate = useNavigate();
  return (
    <motion.div
    initial={{y:50, opacity: 0,scale:0.95 }}
    whileInView={{ y: 0, opacity: 1,scale:1 }}
    transition={{ duration: 0.5,delay:0.5 }}
      onClick={() => {
        setSelectedCar(val);
        navigate(`/car-detail/${val._id}`);
      }}
      className="w-full  shadow shadow-gray-500  rounded-lg overflow-hidden space-y-3 text-start cursor-pointer"
    >
      <div className="w-full h-32 sm:h-48 lg:h-52 overflow-hidden relative group">
        <img
          src={val.image}
          alt={val.brand}
          className="h-full w-full object-cover group-hover:scale-110 transition-all duration-300"
        />
        {val.isAvaliable && (
          <p className="absolute top-0.5 left-0.5 sm:top-2 sm:left-2 bg-blue-600 py-1 px-2 rounded-full text-white  text-[6px] sm:text-xs">
            Availabe Now
          </p>
        )}
        <p className="absolute bottom-0.5  right-0.5 text-[8px] sm:bottom-2 sm:right-2 bg-black py-0.5 px-2 rounded-sm text-white sm:text-xl">
          ${val.dailyprice}/day
        </p>

        <p className="absolute h-3/4 translate-y-full group-hover:translate-y-0 bg-white/65 inset-x-0 bottom-0 transition-all duration-300 p-2 text-xs sm:text-[16px]">
          {val.discription}
        </p>
      </div>
      <div className="p-2">
        <p className="text-xs sm:text-xl">
          {val.brand} {val.model}
        </p>
        <p className="text-[10px] sm:text-xs  text-gray-500 mb-2">{val.model} {val.year}</p>
        <div className="space-y-2 ">
          <div className="flex-syle flex-col sm:flex-row sm:items-center    sm:justify-between text-xs text-gray-500 ">
            {" "}
            <span className="flex-syle sm:justify-center  ">
              <Users className="h-4" /> {val.seatingcapacity} Seates{" "}
            </span>
            <span className="flex-syle sm:justify-center ">
              <Fuel className="h-4" />{val.fueltype}
            </span>
          </div>
          <div className="flex-syle flex-col sm:flex-row sm:items-center   sm:justify-between text-xs text-gray-500">
            <span className="flex-syle sm:justify-center ">
              {" "}
              <Car className="h-4" /> {val.transmission}
            </span>
            <span className="flex-syle sm:justify-center">
              <MapPin className="h-4" /> {val.location}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CardList;
