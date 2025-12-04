import { ArrowRight, Filter, Loader, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import CardList from "../commponets/CardList";
import carStore from "../store/car";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "motion/react";


function listCarsPage() {
  const searchSuggesion = useRef();
  const [searchGetload,setSearchGetload]=useState(false);
  const inputSearch = useRef();
  const {
    GetCarList,
    carList,
    loading,
    getCarBySearch,
    searchLoading,
    getSearchWords,
    allSearchWord,
    loadingMorecars,
    ChangeSearchLoad,
    GetMoreCarList,
    getMoreCarBySearch,
    totalPage,
    ChangeCurrentPage,
    currentPage,
    GetCarByDate
  } = carStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSearch, setFilterSearch] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getSearchTerm = searchParams.get("search");
    const getSearchLocation = searchParams.get("location");
     const getPickupdate = searchParams.get("pickupdate");
     const getReturndate = searchParams.get("returndata");
    

    async function ListCarconfig() {

      if(getSearchLocation && getPickupdate && getReturndate){
        setSearchGetload(true);
       await GetCarByDate(getSearchLocation,getPickupdate,getReturndate);
        setSearchGetload(false);
        return;
      }


      if (getSearchTerm) {
        setSearchGetload(true);
        await getCarBySearch(getSearchTerm);
        setSearchGetload(false);
        setSearchTerm(getSearchTerm);
      } else {
        setSearchParams({});
        ChangeSearchLoad(true);
          await GetCarList();
        
      }
    }

    ListCarconfig();

    getSearchWords();
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (
        !searchSuggesion.current.contains(e.target) &&
        filterSearch.length > 0
      ) {
        setFilterSearch([]);
      }
    });
  });

 

  function searchWordFilter(e) {
    const { value } = e.target;
    setSearchTerm(value);
    const filterword = allSearchWord.filter((val) => val.includes(value));
    const limitSearchword = filterword.slice(0, 10);
    setFilterSearch(limitSearchword);
  }

  async function handleSearch(e) {
    e.preventDefault();
    setFilterSearch([]);
    if (searchTerm) {
      setSearchParams({ search: searchTerm });
      ChangeSearchLoad(false);
      await getCarBySearch(searchTerm);
    } else {
      setSearchParams({});
      ChangeSearchLoad(true);
      await GetCarList();
    }
  }

  function featchMoreCars() {
    const getSearchTerm = searchParams.get("search");

    if (getSearchTerm) {
      getMoreCarBySearch(getSearchTerm, currentPage + 1);
    } else {
      GetMoreCarList(currentPage + 1);
    }

    ChangeCurrentPage(currentPage + 1);
  }

  if (loading || searchGetload) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={40} className="animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
    initial={{ y: 100,opacity:0 }}
    whileInView={{ y: 0,opacity:1 }}
    transition={{ duration: 0.5 }}
     className="pt-24 ">
      <motion.div
      initial={{ y: 50,opacity:0 }}
      whileInView={{ y: 0,opacity:1 }}
      transition={{ duration: 0.5,delay:0.2 }}
       className="flex flex-col justify-center items-center space-y-5 bg-gray-100 py-10 px-2.5 ">
        <h2 className="font-bold text-2xl md:text-3xl">Available Cars</h2>
        <p className="text-gray-500">
          Browse our selection of premium vehicles available for your next
          advanture
        </p>

        {/* search  */}
        <form onSubmit={handleSearch} className="w-full flex justify-center">
          <div className="flex justify-between max-w-[500px] p-2 pl-10 border border-gray-300 rounded-full text-gray-500  w-full relative bg-white ">
            <button className="absolute left-1.5 cursor-pointer">
              <Search onClick={handleSearch} />
            </button>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search "
              className="w-full outline-0"
              onChange={searchWordFilter}
              value={searchTerm}
              ref={inputSearch}
            />
            {searchLoading ? <Loader className="animate-spin" /> : <Filter />}
            {filterSearch.length > 0 && (
              <div
                className="absolute top-12 bg-white w-full left-0 rounded-md p-3.5 space-y-2 shadow z-40  "
                ref={searchSuggesion}
              >
                {filterSearch.map((val, index) => (
                  <p
                    key={index}
                    className="hover:bg-gray-400 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(val);
                      inputSearch.current.focus();
                      setFilterSearch([]);
                    }}
                  >
                    {val}
                  </p>
                ))}
              </div>
            )}
          </div>
        </form>
      </motion.div>

      {/* car list */}

      {carList.length > 0 ? (
        searchLoading ? (
          <div className="mt-10 flex justify-center items-center h-full">
            <Loader className="animate-spin   " size={40} />
          </div>
        ) : (
          <div className="mt-40 p-2.5 max-w-6xl mx-auto w-full">
            <p>Showing {carList.length} Cars</p>
            <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(230px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(270px,1fr))] mt-10 gap-5 sm:gap-10 w-full mx-auto space-y-7 items-start">
              {carList.map((val) => (
                <CardList val={val} key={val._id} />
              ))}
            </div>
          </div>
        )
      ) : (
        <p className="font-bold text-center mt-20">No result</p>
      )}

      {carList.length > 0 && currentPage < totalPage && (
        <motion.div
          initial={{ y: 50,opacity:0 }}
          whileInView={{ y: 0,opacity:1 }}
          transition={{ duration: 0.5,delay:0.2 }}
          
         className="flex justify-center items-center my-10">
          {loadingMorecars ? (
            <Loader className="animate-spin" size={30} />
          ) : (
            <button
              className="flex justify-center items-center gap-2.5 bg-linear-to-r from-blue-600 to-blue-300 cursor-pointer text-white p-2 rounded font-bold"
              onClick={featchMoreCars}
            >
              Explore more cars <ArrowRight />
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default listCarsPage;
