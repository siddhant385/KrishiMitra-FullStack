import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { useSupabaseAuth } from "@/utils/supabase";

const ProtectedRoute = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { createClientWithToken } = useSupabaseAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const ensureUser = async () => {
      const supabase = await createClientWithToken(); // ✅ await here
      // console.log(user.id)

      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!data) {
        await supabase.from("users").insert({
          id: user.id,
          name: user.fullName,
          telegram_bot_id: "",
          location: "",
          phone: user.phoneNumber || "",
        });
      }

      setLoading(false);
    };

    ensureUser();
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded || !isSignedIn) return <RedirectToSignIn />;

  if (loading) return <div>Loading...</div>;

  return <Outlet />;
};

export default ProtectedRoute;
