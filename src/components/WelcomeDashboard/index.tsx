

"use client";

import { useEffect, useState, ReactNode, useContext } from "react";
import Image from "next/image";
import { UserContext } from "@/context/UserContext";

const PROGRESS_DURATION = 3000;
const FADE_OUT_DELAY = 2500;
const UNMOUNT_DELAY = 3500;

type Props = { children: ReactNode };

export default function WelcomeDashboard({ children }: Props) {
  const userContext = useContext(UserContext);
  const [showWelcome, setShowWelcome] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!userContext?.user) return;

    const interval = setInterval(
      () => setProgress((prev) => Math.min(prev + 1, 100)),
      PROGRESS_DURATION / 100
    );
    const fadeTimer = setTimeout(() => setFadeOut(true), FADE_OUT_DELAY);
    const removeTimer = setTimeout(() => setShowWelcome(false), UNMOUNT_DELAY);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [userContext?.user]);

  if (!userContext?.user) return null;
  const { user } = userContext;

  return showWelcome ? (
    <div
      className={`flex flex-col items-center justify-center gap-4 min-h-screen px-4 sm:px-6 transition-all duration-1000 ${
        fadeOut ? "opacity-0 scale-95" : "opacity-100 scale-100"
      } bg-gradient-to-b from-emerald-50 to-white`}
    >
      <Image
        src="/images/recipe1.jpg"
        alt="Welcome"
        width={256}
        height={256}
        className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-lg shadow-lg"
      />

      <h2 className="text-xl sm:text-2xl font-bold text-emerald-700 text-center">
        Welcome, {user.name}! 🍴
      </h2>
      <p className="text-sm sm:text-base text-gray-600 text-center">
        Preparing something tasty for you...
      </p>

      <div className="w-48 sm:w-64 h-2 bg-gray-300 rounded-full overflow-hidden mt-4">
        <div
          className="h-2 bg-emerald-500 transition-all duration-75"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen p-4 sm:p-6 animate-fadeIn">{children}</div>
  );
}
