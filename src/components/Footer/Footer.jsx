import React from 'react'
import { NavLink } from 'react-router-dom'
import { House, Camera, TrendingUp, MessageSquare, User } from 'lucide-react';

const Footer = () => {
	return (
		<div className="bg-white h-14 sm:h-16 fixed bottom-0 w-full shadow-lg z-0 flex justify-center">
      {/* Inner wrapper with fixed max width */}
      <div className="flex items-center justify-between w-full max-w-md px-6 sm:px-10">
        <NavLink to="/" className="flex flex-col items-center justify-center text-xs sm:text-sm  hover:bg-green-200 p-1 rounded-2xl hover:text-green-900">
          <House className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className=''>Home</span>
        </NavLink>

        <NavLink to="/chatbot" className="flex flex-col items-center justify-center text-xs sm:text-sm  hover:bg-green-200 p-1 rounded-2xl hover:text-green-900">
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>Chat</span>
        </NavLink>

        <NavLink to="/camera" className="flex flex-col items-center justify-center text-xs sm:text-sm hover:bg-green-200 p-1 rounded-2xl hover:text-green-900">
          <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>Camera</span>
        </NavLink>

        <NavLink to="/trade" className="flex flex-col items-center justify-center text-xs sm:text-sm hover:bg-green-200 p-1 rounded-2xl hover:text-green-900">
          <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>Trade</span>
        </NavLink>

        <NavLink to="/profile" className="flex flex-col items-center justify-center text-xs sm:text-sm hover:bg-green-200 p-1 rounded-2xl hover:text-green-900">
          <User className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>Profile</span>
        </NavLink>
      </div>
    </div>
	)
}

export default Footer