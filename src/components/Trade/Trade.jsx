import React, { useState } from "react";
import {
  MapPin,
  RefreshCcw,
  Search,
  Funnel,
  TrendingUp,
  Sprout,
  TrendingDown,
  Lightbulb,
  X,
} from "lucide-react";


const Trade = () => {
  const [selectedCity, setSelectedCity] = useState("New Delhi");
  const [showDialog, setShowDialog] = useState(false);

  const cities = [
    "Ahmedabad",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Jaipur",
    "Kolkata",
    "Lucknow",
    "Mumbai",
    "New Delhi",
    "Pune",
    "Surat",
    "Varanasi",
  ].sort();

  return (
    <div className="mt-20 cursor-pointer text-black flex flex-col items-center px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
        Market Price
      </h1>

      {/* =======location===== */}
      <div className="flex flex-row gap-2 sm:gap-5 mt-3 items-center justify-center w-full max-w-lg">
        <div className="text-gray-500 text-sm sm:text-base lg:text-lg">
          Today's Price
        </div>
        <div className="flex flex-row gap-1 items-center justify-center hover:bg-green-200 px-3 py-2 rounded-2xl transition duration-300">
          <MapPin className="text-indigo-700 w-4 h-4 sm:w-5 sm:h-5" />
          <div className="text-indigo-700 font-medium text-sm sm:text-base lg:text-lg">
            {selectedCity}
          </div>
        </div>
        <RefreshCcw className="ml-auto w-4 h-4 sm:w-5 sm:h-5 cursor-pointer" />
      </div>

      {/* ====input====== */}
      <div className="flex flex-row gap-2 sm:gap-5 items-center justify-center w-full mt-4">
        <div className="flex flex-row items-center justify-center border border-gray-200 px-3 py-2 rounded-2xl w-full sm:w-auto">
          <Search className="text-gray-500 mr-2 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Search Crop..."
            className="w-full outline-none text-sm sm:text-base lg:text-lg bg-transparent"
          />
        </div>
        <div className="border border-gray-300 rounded-2xl p-2">
          <Funnel className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>

      {/* ======blue-green======== */}
      <div className="flex flex-col gap-2 justify-center items-center w-full max-w-lg mt-4">
        <div className="flex flex-row gap-4 bg-gradient-to-r from-indigo-200 to-cyan-100 p-3 rounded-2xl justify-between items-center w-full hover:border-2 border-indigo-500 transform transition-transform duration-300 hover:scale-105">
          <MapPin className="text-indigo-700 w-5 h-5 sm:w-6 sm:h-6" />
          <div className="flex flex-col text-black flex-1 ml-2">
            <div className="text-sm sm:text-base lg:text-lg">
              {selectedCity} Market
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              Current Location
            </div>
          </div>
          <button
            onClick={() => setShowDialog(true)}
            className="cursor-pointer bg-gray-100 border border-gray-500 px-3 py-1 rounded-2xl text-xs sm:text-sm font-medium text-black"
          >
            Change
          </button>
        </div>

        <div className="flex flex-row gap-4 bg-gradient-to-r from-green-200 to-yellow-100 p-3 rounded-2xl justify-between items-center w-full hover:border-2 border-green-500 transform transition-transform duration-300 hover:scale-105">
          <TrendingUp className="text-green-700 w-5 h-5 sm:w-6 sm:h-6" />
          <div className="flex flex-col text-black flex-1 ml-2">
            <div className="text-sm sm:text-base lg:text-lg">Price Alert</div>
            <div className="text-xs sm:text-sm text-gray-500">
              Onion prices increased by 20% this week
            </div>
          </div>
        </div>
      </div>

      {/* ========cards======= */}
      <div className="flex flex-col gap-3 items-center w-full max-w-lg mt-4">
        {[
          { name: "Wheat", price: "₹2,150", change: "+50", up: true },
          { name: "Rice", price: "₹2,800", change: "+50", up: true },
          { name: "Soyabean", price: "₹4,200", change: "-80", up: false },
          { name: "Cotton", price: "₹5,800", change: "+120", up: true },
          { name: "Onion", price: "₹1,200", change: "+200", up: true },
          { name: "Tomato", price: "₹800", change: "-150", up: false },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex flex-row border border-gray-300 hover:border-gray-500 rounded-2xl justify-between gap-2 items-center transform transition-transform duration-300 hover:scale-105 p-3 w-full"
          >
            <Sprout className="text-green-500 w-5 h-5 sm:w-6 sm:h-6" />
            <div className="flex flex-row justify-between w-full ml-2">
              <div className="flex flex-col items-start">
                <div className="font-medium text-lg sm:text-xl lg:text-2xl text-black">
                  {item.name}
                </div>
                <div className="flex flex-row items-center text-xs sm:text-sm text-gray-500">
                  <MapPin className="w-3 h-3 mr-1" />
                  {selectedCity} Market
                </div>
                <div className="text-xs sm:text-sm text-gray-500">18/9/25</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="font-medium text-lg sm:text-xl lg:text-2xl text-black">
                  {item.price}
                </div>
                <div className="flex flex-row items-center text-xs sm:text-sm">
                  {item.up ? (
                    <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1 text-red-500" />
                  )}
                  <div
                    className={`font-bold ${
                      item.up ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {item.change}
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-gray-700 font-medium">
                  Set Alert
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* =========buttons===== */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center items-center mt-4 w-full max-w-lg">
        <div className="flex flex-row justify-center items-center border border-gray-300 hover:border-gray-500 hover:bg-green-600 gap-2 rounded-xl px-4 py-2 hover:text-white w-full sm:w-auto">
          <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
          <div className="text-sm sm:text-base font-medium">Set Alert</div>
        </div>
        <div className="flex flex-row justify-center items-center border border-gray-300 hover:border-gray-500 hover:bg-green-600 gap-2 rounded-xl px-4 py-2 hover:text-white w-full sm:w-auto">
          <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
          <div className="text-sm sm:text-base font-medium">Search Market</div>
        </div>
      </div>

      {/* ======tip========== */}
      <div className="flex flex-col mb-20 justify-center items-center text-xs sm:text-sm lg:text-base bg-yellow-50 border border-yellow-100 hover:border-yellow-200 p-3 mt-4 rounded-2xl w-full max-w-lg">
        <div className="flex flex-row items-center gap-2 mb-1">
          <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />
          <div className="font-bold text-sm sm:text-base lg:text-lg">
            Market Tip
          </div>
        </div>
        <div className="font-light text-center">
          Demand for vegetables increases during the winter season. Consider
          selling your produce in local markets for better prices.
        </div>
      </div>

      {/* ===== Modal ===== */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-2xl w-80 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold">Select City</h2>
              <X
                onClick={() => setShowDialog(false)}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
            <ul className="space-y-2">
              {cities.map((city, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setSelectedCity(city);
                    setShowDialog(false);
                  }}
                  className="p-2 border rounded-xl hover:bg-indigo-100 cursor-pointer"
                >
                  {city}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trade;
