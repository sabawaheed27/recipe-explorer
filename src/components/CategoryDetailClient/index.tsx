"use client";

import { useState, useContext, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { Meal, MealSummary } from "@/utils/types";
import BackButton from "@/components/BackButton";

interface CategoryDetailClientProps {
  initialMeals: MealSummary[];
  category: string;
}

export default function CategoryDetailClient({
  initialMeals,
  category,
}: CategoryDetailClientProps) {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const [savedMeals, setSavedMeals] = useState<string[]>([]);

  useEffect(() => {
    if (!userContext || !userContext.user) {
      router.push("/");
    } else {
      setSavedMeals(userContext.user.favouriteRecipes.map((r) => r.idMeal));
    }
  }, [userContext, router]);

  if (!userContext || !userContext.user) {
    return null; // Or a loading spinner
  }
  const { user, setUser } = userContext;

  const toggleFavorite = useCallback(async (meal: MealSummary) => {
    if (!user) return;
    const isSaved = user.favouriteRecipes.some((r) => r.idMeal === meal.idMeal);

    if (isSaved) {
      // If it's already saved, just remove it. No need to fetch.
      const updatedFavorites = user.favouriteRecipes.filter((r) => r.idMeal !== meal.idMeal);
      setUser({ ...user, favouriteRecipes: updatedFavorites });
    } else {
      // If it's a new favorite, fetch the full meal details first.
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
        const data = await response.json();
        if (data.meals && data.meals[0]) {
          const fullMeal = data.meals[0];
          setUser({ ...user, favouriteRecipes: [...user.favouriteRecipes, fullMeal] });
        }
      } catch (error) {
        console.error("Failed to fetch full meal details:", error);
      }
    }
  }, [user, setUser]);

  if (initialMeals.length === 0) {
    return (
      <div className="text-center p-10 text-gray-200">
        <BackButton />
        <h1 className="text-3xl font-bold mb-2 text-pink-400">
          No Meals Found in {decodeURIComponent(category)}
        </h1>
        <p className="text-gray-400">Try selecting a different category.</p>
        <Link
          href="/"
          className="mt-4 inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-8 bg-gray-900 min-h-screen text-gray-100">
      <div className="mb-6">
        <BackButton />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-3">
        Meals in <span className="text-teal-400">{decodeURIComponent(category)}</span>
      </h1>
      <p className="text-gray-400 mb-8">
        Browse the delicious meals in this category.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {initialMeals.map((m) => {
          const isSaved = savedMeals.includes(m.idMeal);
          return (
            <div
              key={m.idMeal}
              className="relative group bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-teal-500/40"
            >
              <Link href={`/item/${m.idMeal}`}>
                <Image src={m.strMealThumb} alt={m.strMeal} width={400} height={300} className="w-full h-52 object-cover" />
                <div className="p-4">
                  <p className="font-semibold text-gray-100 truncate line-clamp-2 group-hover:text-teal-400 transition-colors duration-300">{m.strMeal}</p>
                </div>
              </Link>
              <button onClick={() => toggleFavorite(m)} className={`absolute top-2 right-2 px-3 py-1 rounded-full text-white font-semibold text-sm shadow-md transition-colors ${isSaved ? "bg-pink-500 hover:bg-pink-600" : "bg-teal-500 hover:bg-teal-600"}`}>
                {isSaved ? "Saved" : "Fav"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
