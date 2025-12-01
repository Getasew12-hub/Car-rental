import { Check, Loader, Upload, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import dashboaradStore from "../../store/dashboard";

function AddCars() {

  const { CreateCars,loading } = dashboaradStore();
  const imageAccepter = useRef();
  const [addcars, setAddcars] = useState({
    image: "",
    brand: "",
    model: "",
    year: "",
    dailyprice: "",
    catagory: "Sedan",
    transmission: "",
    fueltype: "",
    seatingcapacity: "",
    location: "Addis abeba",
    discription: "",
  });

  function handleImageUpload(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target.result;
        setAddcars((pre) => {
          return {
            ...pre,
            image: imageDataUrl,
          };
        });

        
      };

      reader.readAsDataURL(file);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setAddcars((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  }

  async function handleSubmint(e) {
    e.preventDefault();

    if (
      validation(addcars.image) ||
      validation(addcars.brand) ||
      validation(addcars.model) ||
      validation(addcars.year) ||
      validation(addcars.dailyprice) ||
      validation(addcars.catagory) ||
      validation(addcars.transmission) ||
      validation(addcars.fueltype) ||
      validation(addcars.seatingcapacity) ||
      validation(addcars.location)
    ) {
      toast.error("All input is reqaired");
      return;
    }

   const response=await CreateCars(addcars);
   if(response){
    setAddcars({
      image: "",
      brand: "",
      model: "",
      year: "",
      dailyprice: "",
      catagory: "Sedan",
      transmission: "",
      fueltype: "",
      seatingcapacity: "",
      location: "Addis abeba",
      discription: "",
    });
   }
  }
  function validation(val) {
    if (!val || val.length == 0) return true;
    return false;
  }
  function imagClear() {
    setAddcars((pre) => {
      return {
        ...pre,
        image: "",
      };
    });
    imageAccepter.current.value = null;
  }
  return (
    <div className="pt-6 px-5 max-w-5xl flex-1 box-border w-full overflow-y-auto h-full pb-10 scrollhiden ">
      <h2 className="font-medium text-xl sm:text-2xl">Add New Car</h2>
      <p className="text-gray-500 mb-10">
        Fill in details to list a new for booking,including
        pricing,availability,and car specifications.
      </p>
      <form onSubmit={handleSubmint} className="space-y-5">
        <div className="inputflex">
          <div className="inputdiv">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              name="brand"
              id="brand"
              placeholder="e.g BMW,Mercedes,Audi.."
              className="inputStyle  "
              onChange={handleChange}
              value={addcars.brand}
              required
            />
          </div>
          <div className="inputdiv">
            <label htmlFor="model">Model</label>
            <input
              type="text"
              name="model"
              id="model"
              placeholder="e.g X5,E-Class,M4.."
              className="inputStyle"
              onChange={handleChange}
              value={addcars.model}
              required
            />
          </div>
        </div>

        <div className="inputflex ">
          <div className="inputdiv ">
            <label htmlFor="year">Year</label>
            <input
              type="number"
              name="year"
              id="year"
              placeholder="2025"
              min={1950}
              className="inputStyle  "
              onChange={handleChange}
              value={addcars.year}
              required
            />
          </div>

          <div className="inputdiv">
            <label htmlFor="dailyprice">Daily Price($)</label>
            <input
              type="number"
              name="dailyprice"
              id="dailyprice"
              placeholder="100"
              min={0}
              className="inputStyle "
              onChange={handleChange}
              value={addcars.dailyprice}
              required
            />
          </div>

          <div className="inputdiv">
            <label htmlFor="catagory">Category</label>

            <select
              name="catagory"
              id="catagory"
              onChange={handleChange}
              value={addcars.catagory}
              className="inputStyle  "
            >
              <option value="Sedan">Sedan</option>
              <option value="suv">suv</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        <div className="inputflex">
          <div className="inputdiv">
            <label htmlFor="transmission">Transmission</label>
            <input
              type="text"
              name="transmission"
              id="transmission"
              placeholder="Automatic"
              className="inputStyle  "
              onChange={handleChange}
              value={addcars.transmission}
              required
            />
          </div>
          <div className="inputdiv">
            <label htmlFor="fueltype">Fuel Type</label>
            <input
              type="text"
              name="fueltype"
              id="fueltype"
              placeholder="Disel"
              className="inputStyle  "
              required
              onChange={handleChange}
              value={addcars.fueltype}
            />
          </div>
          <div className="inputdiv">
            <label htmlFor="seatingcapacity">Seating Capacity</label>
            <input
              type="number"
              name="seatingcapacity"
              id="seatingcapacity"
              min={1}
              placeholder="5"
              className="inputStyle  "
              onChange={handleChange}
              value={addcars.seatingcapacity}
              required
            />
          </div>
        </div>

        <div className="inputdiv">
          <label htmlFor="location">Location</label>
  


          <select name="location" id="location" className="inputStyle"  onChange={handleChange}
            value={addcars.location}>
            <option value="addisabeba">Addis abeba</option>
            <option value="bahirdar">Bahirdat</option>
            <option value="adama">Adama</option>
            <option value="hawassa">Hawassa</option>
          </select>
        </div>
        <div className="inputdiv relative">
          <label htmlFor="discription">Discription</label>
          <textarea
            name="discription"
            id="discription"
            maxLength={120}
            rows={4}
            placeholder="Describe your car,its conditon,and any notable datails"
            className="inputStyle   resize-none "
            onChange={handleChange}
            value={addcars.discription}
          > </textarea>

          <span className="absolute bottom-3 right-3 text-gray-400 text-sm">
            {addcars.discription.length}/120
          </span>
        </div>

        <div>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            hidden
            ref={imageAccepter}
            onChange={handleImageUpload}
          />
          <button
            type="button"
            onClick={() => imageAccepter.current.click()}
            className="bg-gray-300 py-1 px-3 rounded flex flex-col items-center justify-center cursor-pointer sm:font-bold font-medium text-sm"
          >
            <Upload />
            Upload image
          </button>
          <p className="text-gray-500 text-sm">Image size must be less than 10mb</p>

          {addcars.image && (
            <div className="relative mt-3.5 mb-12">
              <X
                className="absolute top-0 bg-gray-600/50 cursor-pointer text-white"
                onClick={imagClear}
              />
              <img
                src={addcars.image}
                alt=""
                className="max-w-52 w-full rounded-md "
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="font-bold bg-blue-500 text-white py-3 w-32 rounded-md cursor-pointer flex justify-center items-center gap-2"
        >{loading ? <Loader className="animate-spin" />: <>  <Check />
          List Car</>}
        </button>
      </form>
    </div>
  );
}

export default AddCars;
