import React from 'react'
import { useAuthStore } from '../utils/zustandStore.js';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
  const clearToken = useAuthStore((state) => state.clearToken);
  const logOutHandler =()=>{
    try {
       clearToken();
       navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className=' fixed top-0 h-[75px] w-full bg-gray-900 border-b-2 border-gray-700 flex justify-around items-center '>
        <div className='headerLogo text-3xl'>Merge <span className='bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-600 bg-clip-text text-transparent'> Ai </span></div>
        <button className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 cursor-pointer' onClick={logOutHandler}>Log Out</button>
    </div>
  )
}

export default Header