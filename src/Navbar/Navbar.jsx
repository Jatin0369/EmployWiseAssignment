import React from 'react'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const username = Cookies.get("authToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("authToken");
    navigate("/"); // Redirect to login page
  };
  return (
    username ? (
    <div className='navbar flex bg-blue-400 h-[8vh] justify-end rounded-md w-[80%] mx-auto my-4'>
        <div className="two-cont flex w-[20%] justify-evenly">
            <p className='text-center my-auto text-white font-semibold text-xl'>Hey, User</p>
            <button className='logout-btn my-auto text-white font-semibold text-xl hover:underline' onClick={handleLogout}>Logout</button>
        </div>
    </div>
    ):null  
  )
}

export default Navbar