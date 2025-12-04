import React, { use, useEffect, useState } from 'react'
import { Routes,Route, useLocation } from 'react-router-dom'
import HomePage from './pages/homePage'
import Nabbar from './commponets/Nabbar'
import Login from './commponets/Login';
import CardDetailpage from "./pages/carDetailPage"
import CarList from "./pages/listCarsPage";
import Mybooking from "./pages/myBookingPaga"
import {Toaster} from "react-hot-toast"
import Footer from './commponets/Footer';
import ScrollToTop from './commponets/ScroollTop';
import AddminDashbord from './pages/AddminDashbord';
import useStore from './store/user';
import { Loader } from 'lucide-react';

function App() {
  const {CheckAuth,checkAuth,user}=useStore();
   const location = useLocation();
   const pathstart=location.pathname.startsWith("/admin-dashbord")
  const [showLogin,setshowLogin]=useState(false);
 

  useEffect(() => {
    CheckAuth();
  }, []);
  useEffect(() => {
    if (user) {
      setshowLogin(false);
    }
  }, [user]);

  if (checkAuth) return <div className='flex justify-center items-center h-screen '><Loader size={45} className='animate-spin'/></div>;
  return (
    <div className='overflow-x-hidden w-full'>

      <ScrollToTop/>
      <Nabbar showLogin={setshowLogin} />
  
    {showLogin &&  <Login showLogin={setshowLogin}/>}
   
<Routes>
  <Route path='/' element={<HomePage/>}/>
  <Route path='/car-detail/:id' element={<CardDetailpage/>}/>
  <Route path='/car-list' element={<CarList/>}/>
  <Route path='/my-booking' element={<Mybooking/>}/>
  <Route path='/admin-dashbord/:navigate' element={user?.role=="admin" ? <AddminDashbord/> :<HomePage/>}/>
 <Route path='*' element={<HomePage/>}/>
</Routes>
{!pathstart &&<div className='pt-40'>
<Footer />
</div>}
  
   <Toaster/>
    </div>
  )
}

export default App