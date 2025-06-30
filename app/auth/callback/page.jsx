// /app/auth/callback/page.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const getSessionAndRedirect = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error.message);
        return;
      }

      if (session) {
        console.log("Session retrieved:", session);
        router.push("/dashboard");
      } else {
        console.warn("No session found. Staying on callback page.");
      }
    };

    getSessionAndRedirect();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-lg font-bold">Redirecting...</h2>
    </div>
  );
}
