"use client";

import Link from "next/link";
import { Utensils, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-emerald-700 to-emerald-900 text-white mt-10">

      {/* Wave separator */}
      <div className="absolute -top-6 w-full overflow-hidden leading-none rotate-180">
        <svg
          viewBox="0 0 1440 100"
          className="w-full h-6"
          preserveAspectRatio="none">
          <path
            d="M0,32L48,37.3C96,43,192,53,288,69.3C384,85,480,107,576,112C672,117,768,107,864,101.3C960,96,1056,96,1152,90.7C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            className="fill-white/10"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10">

        {/* Logo / Branding */}
        <div className="flex items-center gap-2">
          <Utensils className="w-7 h-7 text-orange-300" />
          <span className="font-bold text-xl sm:text-2xl">FlavorQuest</span>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6 flex-wrap justify-center">
          {["Home", "Categories", "Profile"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="hover:text-yellow-300 transition-colors font-medium">
              {item}
            </Link>
          ))}
        </div>

        {/* Personal Links (GitHub & LinkedIn) */}
        <div className="flex gap-4">
          <Link
            href="https://github.com/sabawaheed27"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition">
            <Github className="w-5 h-5" />
          </Link>
          <Link
            href="https://www.linkedin.com/feed/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition">
            <Linkedin className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Credits */}
      <div className="text-center text-gray-200 text-sm mt-4 pb-4 relative z-10">
        Powered by{" "}
        <Link
          href="https://www.themealdb.com/"
          target="_blank"
          className="underline hover:text-yellow-300"
          rel="noopener noreferrer">
          TheMealDB
        </Link>
      </div>
    </footer>
  );
}
