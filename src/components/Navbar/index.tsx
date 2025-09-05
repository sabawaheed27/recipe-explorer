

"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { Utensils, Menu, X } from "lucide-react";
import Link from "next/link";


const Navbar = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  if (!userContext) return null;
  const { user, logout } = userContext;

  const handleLogout = () => {
    logout();
    router.replace("/");
    setIsOpen(false);
  };

  return (
    <nav className="bg-emerald-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 rounded-b-xl">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:scale-105 transition">
          <Utensils className="w-7 h-7 text-orange-300" />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide">
            FlavorQuest
          </h1>
        </Link>

        {/* Desktop Links */}
        {user && (
          <div className="hidden md:flex items-center gap-6">
            {["Home", "Profile", "Categories"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="relative font-medium hover:text-yellow-300 after:block after:h-0.5 after:bg-yellow-300 after:scale-x-0 hover:after:scale-x-100 after:transition after:origin-left">
                {item}
              </Link>
            ))}

            <span className="font-semibold text-yellow-200">
              Hi, {user.name}
            </span>

            <button
              type="button"
              onClick={handleLogout}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg shadow-md hover:shadow-lg transition">
              Logout
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        {user && (
          <button
            className="md:hidden p-2 rounded hover:bg-emerald-600 transition"
            onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && user && (
        <div className="md:hidden bg-emerald-800 px-4 py-3 space-y-3 rounded-b-xl">
          {["Home", "Profile", "Categories"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="block font-medium hover:text-yellow-300 transition">
              {item}
            </Link>
          ))}

          <span className="block text-yellow-200 font-semibold">
            Hi, {user.name}
          </span>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
