import { create } from "zustand";
import axios from "../middleware/axios";
import { toast } from "react-hot-toast";

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

const userStore = create((set, get) => ({
  user: null,
  checkAuth: true,
  loading: false,

  SingupUser: async (userData) => {
    set({ loading: true });
    if (!validateEmail(userData.email)) {
        set({loading:false})
      return toast.error("Invalid email format");
    }
    if (userData.password.length < 6 || !userData.password) {
      set({ loading: false });
      return toast.error("Password must be at least 6 characters long");
    }
    if (!userData.name) {
      set({ loading: false });
      return toast.error("Name is required");
    }

    try {
      const { name, email, password } = userData;
      const response = await axios.post("/auth/signup", {
        name,
        email,
        password,
      });
      set({ user: response.data });
      toast.success("Signup successful");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ loading: false });
    }
  },

  LoginUser: async (userData) => {
    set({ loading: true });
    if (!validateEmail(userData.email))
      return toast.error("Invalid email format");
    if (!userData.password) return toast.error("Password is required");
    try {
      const { email, password } = userData;
      const response = await axios.post("/auth/login", { email, password });
      set({ user: response.data });
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
    } finally {
      set({ loading: false });
    }
  },
  LogoutUser: async () => {
    set({ loading: true });
    try {
      await axios.post("/auth/logout");
      set({ user: null });
      toast.success("Logout successful");
    } catch (error) {
      toast.error(error.response?.data?.error || "Logout failed");
    } finally {
      set({ loading: false });
    }
  },
  CheckAuth: async () => {
    set({ loading: true, checkAuth: true });
    try {
      const response = await axios.post("/auth/chektoken");
      set({ user: response.data });
    } catch (error) {
      set({ user: null });
    } finally {
      set({ loading: false, checkAuth: false });
    }
  },
}));

export default userStore;
