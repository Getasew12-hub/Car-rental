import { create } from "zustand";
import axios from "../middleware/axios";
import toast from "react-hot-toast";



const carStore = create((set, get) => ({
  carList: [],
  featureCars: [],
  loading: false,
  selectedCar: null,
  searchLoading: false,
  loadingMorecars: false,
  allSearchWord: [],
  searchLoad: false,
  totalPage: 1,
  currentPage: 1,

  GetCarList: async () => {
    set({ loading: true });

    try {
      const response = await axios.get(`/cars/getcarslist?page=1`);

      if (get().searchLoad) {
        set({
          carList: response.data.carlist,
          searchLoad: false,
          currentPage: 1,
        });
      } else {
        set({ carList: [...get().carList, ...response.data.carlist] });
      }

      set({ totalPage: response.data.totalPage });
    } catch (error) {
      toast.error("Failed to fetch car list");
    } finally {
      set({ loading: false });
    }
  },

  GetFeaturedCars: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/cars/featuredcars");
      set({ featureCars: response.data });
    } catch (error) {
      toast.error("Failed to fetch featured cars");
    } finally {
      set({ loading: false });
    }
  },
  setSelectedCar: (car) => {
    set({ selectedCar: car });
  },
  GetSelectedCarById: async (id) => {
    
    if (get().selectedCar && get().selectedCar._id === id) {
      return;
    }
    set({ loading: true });
    try {
      const response = await axios.get(`/cars/getcarbyid/${id}`);
      set({ selectedCar: response.data });
    } catch (error) {
      toast.error("Failed to fetch car details");
    } finally {
      set({ loading: false });
    }
  },
  getCarBySearch: async (searchTerm) => {
    set({ searchLoading: true });
    try {
      const response = await axios.post(`/cars/getcarbysearch?page=1`, {
        search: searchTerm,
      });
     
      if (get().searchLoad) {
        set({ carList: [...get().carList, response.data.carlist] });
      } else {
        set({
          carList: response.data.carlist,
          searchLoad: true,
          currentPage: 1,
        });
      }

      set({ totalPage: response.data.totalPage });
    } catch (error) {
      toast.error("Search failed");
      return 1;
    } finally {
      set({ searchLoading: false });
    }
  },
  getSearchWords: async () => {
    try {
      const response = await axios.get("/cars/getSearchword");

      set({ allSearchWord: response.data });
    } catch (error) {
      toast.error("Failed to fetch search words");
      return [];
    }
  },
  ChangeSearchLoad: async (val) => {
    set({ searchLoad: val });
  },

  GetMoreCarList: async (page) => {
    set({ loadingMorecars: true });

    try {
      const response = await axios.get(`/cars/getcarslist?page=${page}`);
      set({ carList: [...get().carList, ...response.data.carlist] });
    } catch (error) {
      toast.error("Failed to fetch car list");
    } finally {
      set({ loadingMorecars: false });
    }
  },
  getMoreCarBySearch: async (searchTerm, page) => {
    set({ loadingMorecars: true });
    try {
      const response = await axios.post(`/cars/getcarbysearch?page=${page}`, {
        search: searchTerm,
      });
     

      set({ carList: [...get().carList, ...response.data.carlist] });
    } catch (error) {
      toast.error("Search failed");
    } finally {
      set({ loadingMorecars: false });
    }
  },
  ChangeCurrentPage: async (val) => {
    set({ currentPage: val });
  },


  GetCarByDate: async (location,bookingDate,returnDate) => {
    set({ loading: true });
    try {
        const response = await axios.post("/cars/getcarbypickreturn", { location,bookingDate,returnDate });
        set({ carList: response.data });
    } catch (error) {
        toast.error("Failed to fetch cars by date");
    } finally {
        set({ loading: false });
    }
},

}));

export default carStore;
