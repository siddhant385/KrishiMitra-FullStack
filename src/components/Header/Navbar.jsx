import React, { useState } from 'react'
import { ClerkProvider, SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react'
import { Globe, Bell, Menu, Leaf, X,CloudDrizzle,ChartNoAxesCombined ,Bug,House ,Search ,Settings ,HandHelping ,Info   } from 'lucide-react';
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = ({  }) => {
  const { language, changeLanguage } = useLanguage();
//   const [language, changeLanguage] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [languageMenu,setLanguageMenu]=useState(false);
    // const [activeLang, setActiveLang] = useState(language); // selected language


   const handleLanguageSelect = (langCode) => {
     changeLanguage(langCode);
    // changeLanguage(false);
  };
  
  return (
    <nav className="bg-white w-full h-14 sm:h-16 flex items-center justify-between 
      px-4 sm:px-8 text-black shadow-md fixed top-0 z-50">
      
      <div className="flex flex-row items-center gap-2">
        <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-green-600"/>
        <div className="text-black tracking-wider font-bold text-lg sm:text-2xl font-Alans">
          KrishiMitra
        </div>
      </div>

      <div className="flex flex-row gap-3 sm:gap-4 items-center relative">
        <Globe className="w-5 h-5 sm:w-6 sm:h-6" onClick={() => languageMenu?setLanguageMenu(false):setLanguageMenu(true)}/>
            <div className="flex items-center justify-center py-8 px-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
        <div className="flex flex-row gap-2 items-start justify-between relative">
  <Bell
    onClick={() => setShowNotifications(!showNotifications)}
    className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
  />

  {/* Red dot */}
  <div
    className="
      absolute 
      w-2 h-2 sm:w-2 sm:h-2 
      bg-red-500 rounded-full
      right-[-6px] top-0
      sm:right-[-8px] sm:top-0
      md:right-[-10px] md:top-0
      lg:right-[-12px] lg:top-0
    "
  ></div>
</div>

        <Menu className="w-5 h-5 sm:w-6 sm:h-6" onClick={() => setShowMenu(!showMenu)}/>

       {languageMenu && (
  <div
    className="
      absolute top-12 right-0 sm:right-0
      w-[90vw] sm:w-80 md:w-96 lg:w-[28rem]
      max-w-[95vw]
      bg-white shadow-lg rounded-md p-4 z-50 
    "
  >
    <div className="flex flex-row justify-between items-center mb-2">
      <h3 className="text-lg font-bold text-green-700">Language</h3>
      
      <X
        onClick={() => setLanguageMenu(false)}
        className="w-5 h-5 cursor-pointer"
      />

    </div>

    <div className="flex cursor-pointer flex-col gap-1 max-h-60 overflow-y-auto ">
      <div  onClick={()=>handleLanguageSelect("hi-IN")}className={`flex flex-row items-start gap-2 w-full ${language === "hi-IN" ? "bg-green-500 text-white":"hover:bg-green-500 hover:text-white"} rounded-xl p-2 `}>
          <div className='text-xs font-serif mt-1 flex '>IN</div>
          <div>हिंदी</div>
      </div>
      <div  onClick={() => handleLanguageSelect("en-US")} className={`flex flex-row items-start gap-2 w-full ${language === "en-US" ? "bg-green-500 text-white":"hover:bg-green-500 hover:text-white"} rounded-xl p-2 `}>
          <div className='text-xs font-serif mt-1 flex '>US</div>
          <div>English</div>
      </div>
      <div onClick={() => handleLanguageSelect("mr-IN")} className={`flex flex-row items-start gap-2 w-full ${language === "mr-IN" ? "bg-green-500 text-white":"hover:bg-green-500 hover:text-white"} rounded-xl p-2 `}>
          <div className='text-xs font-serif mt-1 flex '>IN</div>
          <div>मराठी</div>
      </div>
      <div onClick={() => handleLanguageSelect("bn-IN")} className={`flex flex-row items-start gap-2 w-full ${language === "bn-IN" ? "bg-green-500 text-white":"hover:bg-green-500 hover:text-white"} rounded-xl p-2 `}>
          <div className='text-xs font-serif mt-1 flex '>IN</div>
          <div>বাংলা</div>
      </div>
      <div onClick={() => handleLanguageSelect("kn-IN")} className={`flex flex-row items-start gap-2 w-full ${language === "kn-IN" ? "bg-green-500 text-white":"hover:bg-green-500 hover:text-white"} rounded-xl p-2 `}>
          <div className='text-xs font-serif mt-1 flex '>IN</div>
          <div>ಕನ್ನಡ</div>
      </div>
      
    </div>
  </div>
)}
       {showNotifications && (
  <div
    className="
      absolute top-12 right-0 sm:right-0
      w-[90vw] sm:w-80 md:w-96 lg:w-[28rem]
      max-w-[95vw]
      bg-white shadow-lg rounded-md p-4 z-50 
    "
  >
    <div className="flex flex-row justify-between items-center mb-2">
      <h3 className="text-lg font-bold text-green-700">Notifications</h3>
      <X
        onClick={() => setShowNotifications(false)}
        className="w-5 h-5 cursor-pointer"
      />
    </div>

    <div className="flex cursor-pointer flex-col gap-3 max-h-60 overflow-y-auto ">
      <div className="flex flex-row items-start gap-2 w-full hover:bg-green-100 rounded-xl p-2 ">
        <CloudDrizzle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
        <div className="flex flex-col">
          <div>Monsoon Update : Heavy rain tomorrow.</div>
          <p className="text-gray-700 text-sm">2 hours before</p>
        </div>
      </div>
      <div className="flex flex-row items-start gap-2 w-full hover:bg-green-100 rounded-xl p-2 ">
        <ChartNoAxesCombined className="w-6 h-6 text-green-500 flex-shrink-0 mt-1 " />
        <div className="flex flex-col">
          <div>Market Update : Increase in Wheat price.</div>
          <p className="text-gray-700 text-sm">4 hours before</p>
        </div>
      </div>
      <div className="flex flex-row items-start gap-2 w-full hover:bg-green-100 rounded-xl p-2 ">
        <Bug  className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1 " />
        <div className="flex flex-col">
          <div>Pest Update : Pest detected in Rice field.</div>
          <p className="text-gray-700 text-sm">6 hours before</p>
        </div>
      </div>
    </div>
  </div>
)}
    
      {showMenu && (
        <div className="fixed top-0 right-0 h-full w-62 sm:w-70 md:w-76 bg-white shadow-2xl 
          border-l border-gray-200 z-50 animate-slideInRight flex flex-col">

          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-bold text-green-700">Menu</h3>
            <X
              onClick={() => setShowMenu(false)}
              className="w-6 h-6 cursor-pointer text-gray-500 transition"
            />
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {[
            
              { icon: <Search className="w-6 h-6 text-blue-600" />, label: "Search Crop" },
              { icon: <HandHelping className="w-6 h-6 text-yellow-600" />, label: "Help" },
              { icon: <Info className="w-6 h-6 text-purple-600" />, label: "Info" },
              { icon: <Settings className="w-6 h-6 text-gray-700" />, label: "Settings" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer 
                  hover:bg-green-500 hover:text-white transition-all duration-200"
              >
                <div>{item.icon}</div>
                <span className="text-base font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}


      </div>
    </nav>
  )
}

export default Navbar;
