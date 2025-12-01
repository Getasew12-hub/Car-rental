import {
  ArrowLeft,
  Car,
  CircleCheckBig,
  Fuel,
  Loader,
  Locate,
  MapPin,
  Users,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";
import carStore from "../store/car";

import bookingStore from "../store/carBooking";
import userStore from "../store/user";


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

function cardDetailPage() {
  const { selectedCar,GetSelectedCarById } = carStore();
  const {AddBookingCar,loading}=bookingStore();
  const {user}=userStore();

  const pickup = useRef();
  const rerurnDate = useRef();
  const navigate = useNavigate();
  const [bookCars, setBookcars] = useState({
    pickup: "",
    return: "",
  });
 const {id}=useParams();


useEffect(() => {
  if(id){

    GetSelectedCarById(id);
  }


}, []);



if (!selectedCar) {
  return <div className="flex justify-center items-center h-screen"><Loader size={40}       className="animate-spin"/></div>;
}

   function formHandler(e) {
    const { name, value } = e.target;

    setBookcars((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  }

  async function formSend(e) {
    e.preventDefault();
    if(!user) return toast.error("You must be logged in to book a car",{id:"notlogin"});
    if (bookCars.pickup > bookCars.return)
      return toast.error(
        "Invalid date,return date must be greater than pick up date ",
        { id: "date" }
      );
    const car = selectedCar._id;
    const bookingDate = bookCars.pickup;
    const returnDate = bookCars.return;
    const priceperday = selectedCar.dailyprice;
  const res= await AddBookingCar(car,bookingDate,returnDate,priceperday);
    setBookcars({
      pickup: "",
      return: "",
    });
 res && navigate("/my-booking");
  }

  function FeatureReturn(e) {
    const classvalue = "text-gray-600";
    const feature = [
      { type: "seate", get: <Users size={15} className={classvalue} /> },
      { type: "gasoline", get: <Fuel size={15} className={classvalue} /> },
      { type: "automatic", get: <Car size={15} className={classvalue} /> },
      { type: "location", get: <MapPin size={15} className={classvalue} /> },
    ];

    const getIcon = feature.filter((val) => val.type == e);
    return getIcon[0].get;
  }
  return (
    <div className="max-w-6xl mx-auto w-full  py-20 px-2.5 space-y-8">
      <button
        onClick={() => history.back()}
        className="flex justify-center items-center cursor-pointer"
      >
        <ArrowLeft /> Back to all cars
      </button>

      <div className="flex flex-col md:flex-row md:gap-10 gap-24 justify-center max-md:items-center  ">
        {/* right side */}

        <div className="flex-1 flex flex-col space-y-2">
          <div className="flex-1 max-md:max-w-[500px]  max-md:w-full  mx-auto flex flex-col  w-full">
            <div className="rounded-lg overflow-hidden flex-1 flex ">
              <img
                src={selectedCar.image}
                alt=""
                className="hover:scale-110 transition-all duration-150 w-full max-h-96 h-full object-cover   "
              />
            </div>
            <p className="font-bold text-xl ">
              {selectedCar.brand} {selectedCar.model}
            </p>
            <p>{selectedCar.year}</p>
          </div>

          <div className="border-t border-gray-500 flex justify-between items-center py-3 flex-wrap gap-2.5">
            {[
              { feature: selectedCar.seatingcapacity, type: "seate" },
              { feature: selectedCar.fueltype, type: "gasoline" },
              { feature: selectedCar.transmission, type: "automatic" },
              { feature: selectedCar.location, type: "location" },
            ].map((val, index) => (
              <div
                key={index}
                className="flex justify-center items-center flex-col bg-gray-300 px-5 py-2 rounded text-sm"
              >
                {FeatureReturn(val.type)} {val.feature}{" "}
              </div>
            ))}
          </div>
          <div>
          {selectedCar.discription && <h2 className="font-bold">Description</h2>}
            <p className="text-gray-500">
              {selectedCar.discription}
            </p>

            <h2 className="font-bold mt-3 mb-1.5">Features</h2>

            <div className="flex justify-between  gap-3  items-center text-gray-500">
              <div className=" flex flex-col gap-3">
                <span className="flex  items-center gap-2 text-sm">
                  <CircleCheckBig /> Leather Seats
                </span>
                <span className="flex items-center gap-2 text-sm">
                  <CircleCheckBig /> Wireless Charging
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <span className="flex items-center gap-2 text-sm">
                  <CircleCheckBig /> Panoramic Sunroof
                </span>
                <span className="flex items-center gap-2 text-sm">
                  <CircleCheckBig /> 360 Camera
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* left side */}
        <div className="shadow-lg shadow-gray-400 p-8 rounded-lg space-y-5  lg:max-w-[400px] lg:w-full max-md:w-full max-md:max-w-[400px] h-full">
          <div className="flex justify-between items-center border-b pb-3  ">
            <span className="font-bold md:text-2xl text-xl">${selectedCar.dailyprice}</span>{" "}
            <span className="font-light text-gray-400">per day</span>
          </div>

          <form onSubmit={formSend} className="space-y-4">
            <div >
              <label htmlFor="pickup">Pickup Date</label>
           
              <div className="border w-full rounded-md p-2.5  mt-2 relative ">{bookCars.pickup && dateFormate(bookCars.pickup) ||<span className="text-gray-400">{ dateFormate( new Date())}</span>}
                   <input
                type="date"
                name="pickup"
                id="pickup"
                className="appearance-none  absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer "
                value={bookCars.pickup}
                onChange={formHandler}
                min={new Date().toISOString().split("T")[0]}
                ref={pickup}
                onClick={() => pickup.current.showPicker()}
                required
              />

              </div>
            </div>

            <div>
              <label htmlFor="return">Return Date</label>

              <div className="border w-full rounded-md p-2.5  mt-2 relative ">
                { bookCars.return && dateFormate(bookCars.return) || <span className="text-gray-400">{dateFormate(new Date(new Date().setDate(new Date().getDate() + 1)))}</span>  }
              <input
                type="date"
                name="return"
                id="return"
                className=" appearance-none  absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                value={bookCars.return}
                onChange={formHandler}
                ref={rerurnDate}
                onClick={() => rerurnDate.current.showPicker()}
                min={new Date().toISOString().split("T")[0]}
                required
              />

              </div>
            </div>

            <button
              className="bg-linear-to-r from-blue-600 to-sky-300 rounded-md p-3.5 cursor-pointer font-bold text-white w-full"
              type="submit"
            >
              {loading ? <Loader className="animate-spin mx-auto" /> : "Book Now "}
              
            </button>
          </form>
          <p>No creadi card required to reserve</p>
        </div>
      </div>
    </div>
  );
}

export default cardDetailPage;
