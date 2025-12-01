import React, { useState } from "react";
import userStore from "../store/user";
import { Loader } from "lucide-react";

const  googleLoginUrl=import.meta.env.VITE_GOOGLE_BACKEND_URL;


function Login({ showLogin }) {
  const { LoginUser, SingupUser, loading } = userStore();
  const [stateform, setStateform] = useState("login");
  const [loginform, setLogingform] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleForm(e) {
    e.preventDefault();

    if (stateform == "login") {
      LoginUser(loginform);
    } else {
      SingupUser(loginform);
    }
  }

  return (
    <div className=" fixed inset-0 flex justify-center items-center  overflow-hidden z-50">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => showLogin(false)}
      />

      <div className="bg-white relative text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          {stateform == "login" ? "Welcome back" : " Sign up"}
        </h2>
        <form onSubmit={handleForm}>
          {stateform == "signup" && (
            <input
              id="name"
              className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
              type="text"
              placeholder="Enter your name"
              required
              onChange={(e) =>
                setLogingform({ ...loginform, name: e.target.value })
              }
            />
          )}

          <input
              id="email"
            className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e) =>
              setLogingform({ ...loginform, email: e.target.value })
            }
          />
          <input
            id="password"
            className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="password"
            placeholder="Enter your password"
            required
            onChange={(e) =>
              setLogingform({ ...loginform, password: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full mb-3 mt-10 bg-blue-500 cursor-pointer py-2.5 rounded-full text-white flex justify-center items-center"
          >
            {loading ? <Loader size={20} className="animate-spin" /> : stateform == "login" ? "Log in" : "Sign up"}
          </button>
        </form>
        <p className="text-center mt-4 ">
          {stateform == "login"
            ? "Don’t have an account?"
            : "I already have an account?"}{" "}
          <span
            onClick={() =>
              stateform == "login"
                ? setStateform("signup")
                : setStateform("login")
            }
            className="text-blue-500 underline cursor-pointer"
          >
            {stateform == "login" ? "Signup" : "Login"}
          </span>
        </p>

     <a href={googleLoginUrl}>   <button
          type="button"
          className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800 cursor-pointer"
        >
          <img
          
            className="h-4 w-4"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
            alt="googleFavicon"
          />
          {stateform == "login" ? "Login" : "Singup"} with Google
        </button></a>
      </div>
    </div>
  );
}

export default Login;
