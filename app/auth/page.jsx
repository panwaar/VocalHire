// /app/auth/page.jsx
"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const AuthPage = () => {
  const router = useRouter();

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `https://vocal-hire.vercel.app/auth/callback`,
      },
    });

    if (error) {
      console.error("OAuth Sign-In Error:", error.message);
    } else {
      console.log("Redirecting to Google login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center border-2 rounded-2xl p-10 bg-[#ffffff]">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={200}
          height={150}
          className="w-[180px]"
        />

        <div className="flex items-center flex-col ">
          <Image
            src={"/login.jpg"}
            alt="login"
            width={500}
            height={300}
            className="w-[250px] h-[250px]"
          />

          <h2 className="text-2xl font-bold text-center mt-5">
            Welcome to VocalHire
          </h2>
          <p className="text-gray-500 text-center">Sign In with Google</p>

          <Button
            className="bg-black text-white p-1 rounded-lg mt-7 w-full"
            onClick={signInWithGoogle}
          >
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
