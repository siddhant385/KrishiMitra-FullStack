import React, { useEffect, useState } from 'react';
import { supabasePublic } from '@/utils/supabase';
import { useAuth } from '@clerk/clerk-react';
const Test = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchCrops = async () => {
      const token = await getToken();
      console.log(token);
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/chatbot/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ message: "Hello from React!" })
        });

        const data = await response.json();
        console.log("Backend response:", data);
      } catch (err) {
        console.error("Error:", err);
      }

      };

    fetchCrops();
  }, []);

  return (
    <div className='mt-20 text-black min-h-screen px-4'>
      <h1 className='text-3xl font-bold mb-6'>Available Crops</h1>

      {loading && <p>Loading crops...</p>}
      {error && <p className='text-red-500'>Error: {error}</p>}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {crops.map((crop) => (
          <div key={crop.id} className='border p-4 rounded shadow'>
            <h2 className='text-xl font-semibold'>{crop.name} ({crop.variety})</h2>
            <p>Season: {crop.season}</p>
            <p>Growth Duration: {crop.growth_duration_days} days</p>
            <p>Water Requirement: {crop.water_requirement}</p>
            <p>Market Price: ₹{crop.market_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
