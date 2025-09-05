"use client"

import { UserContext } from "@/context/UserContext";
import { useCallback, useContext } from "react";
import Image from "next/image";
import BackButton from "@/components/BackButton";

// Define clear types for the data structures used in this component.
interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface User {
  name: string;
  favouriteCategory: string[];
  favouriteRecipes: Recipe[];
}

export default function ProfilePage() {
  const ctx = useContext(UserContext);
  const setUser = ctx?.setUser as (fn: (user: User | null) => User | null) => void;
  const removeRecipe = useCallback((idMeal: string) => {
    setUser((currentUser: User | null) => {
      if (!currentUser) return currentUser; // Should not happen, but good practice
      return {
        ...currentUser,
        favouriteRecipes: currentUser.favouriteRecipes.filter(
          (r) => r.idMeal !== idMeal
        ),
      };
    });
  }, [setUser]);

  const removeCategory = useCallback((category: string) => {
    setUser((currentUser: User | null) => {
      if (!currentUser) return currentUser;
      return {
        ...currentUser,
        favouriteCategory: currentUser.favouriteCategory.filter((c) => c !== category),
      };
    });
  }, [setUser]);

  // Now that all hooks are called, we can perform conditional returns.
  if (!ctx || !ctx.user) {
    return <p>Please login.</p>;
  }
  const { user } = ctx;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <div className="relative max-w-5xl mx-auto p-8 rounded-xl shadow-lg space-y-10 overflow-hidden flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/90 to-emerald-900/80" />
        <div className="relative z-10 text-white">
          <BackButton />
          <h1 className="text-3xl font-bold mb-6">{user.name}&apos;s Profile</h1>

          {/* Favourite Categories */}
          <div>
            <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
              Favourite Categories
            </h2>
            {user.favouriteCategory.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {user.favouriteCategory.map((c) => (
                  <div
                    key={c}
                    className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-400 text-emerald-200 px-3 py-1 rounded-full">
                    <span className="font-medium">{c}</span>
                    <button
                      onClick={() => removeCategory(c)}
                      className="text-sm bg-red-500 hover:bg-red-600 text-white rounded-full px-2 py-0.5 transition">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">No favourite categories</p>
            )}
          </div>

          {/* Favourite Recipes */}
          <div>
            <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
              Favourite Recipes
            </h2>
            {user.favouriteRecipes.length > 0 ? (
              <ul className="divide-y divide-gray-700">
                {user.favouriteRecipes.map((r) => (
                  <li
                    key={r.idMeal}
                    className="flex justify-between items-center py-4 hover:bg-gray-800/40 rounded-lg px-2 transition">
                    <div className="flex items-center gap-4">
                      <Image
                        src={r.strMealThumb}
                        alt={r.strMeal}
                        width={64}
                        height={64}
                        className="object-cover rounded-lg shadow-sm" />
                      <span className="font-medium">{r.strMeal}</span>
                    </div>
                    <button
                      onClick={() => removeRecipe(r.idMeal)}
                      className="bg-red-500 hover:bg-red-600 text-sm px-3 py-1 rounded-lg transition">
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic">No saved recipes</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
