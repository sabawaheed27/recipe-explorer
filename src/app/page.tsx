
"use client";

import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import LoginForm from "@/components/LoginForm";
import WelcomeDashboard from "@/components/WelcomeDashboard";
import Image from "next/image";

export default function Home() {
  // Access user from global context
  const userCtx = useContext(UserContext);
  if (!userCtx) return null; // safety check
  const { user } = userCtx; // user is null if not logged in

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/40 px-4">
      
      {/* Main card container */}
      <div className="flex flex-col md:flex-row bg-zinc-400 rounded-xl shadow-2xl overflow-hidden max-w-5xl w-full">
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          {!user ? (
            // Show login form if no user is logged in
            <>
              <h3 className="text-3xl font-extrabold mb-6 text-emerald-700 text-center">
                Welcome Back!
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Log in to explore delicious recipes
              </p>
              <LoginForm />
            </>
          ) : (
            // If user exists → show welcome animation then dashboard
            <WelcomeDashboard>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">
                  Your Recipe Dashboard
                </h1>
                <p className="text-gray-600">
                  Browse categories and discover fresh ideas!
                </p>
              </div>
            </WelcomeDashboard>
          )}
        </div>

        {/* RIGHT SIDE: background image (hidden on small screens) */}
        <div className="hidden md:block md:w-1/2 relative">
           <Image
            src="/images/background.jpg"
            alt="Delicious food"
            fill
            className="object-cover"/>
          {/* Dark overlay gradient for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}
