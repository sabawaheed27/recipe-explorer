"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { Meal } from "@/utils/types";
import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";

interface ItemDetailClientProps {
  meal: Meal;
}

export default function ItemDetailClient({ meal }: ItemDetailClientProps) {
  const router = useRouter();
  const userContext = useContext(UserContext);

  // Redirect if user is not logged in
  useEffect(() => {
    if (!userContext || !userContext.user) {
      router.push("/");
    }
  }, [userContext, router]);

  if (!userContext || !userContext.user) {
    // Render a loading/redirecting state
    return (
      <div className="text-center p-10">
        <p className="text-lg text-gray-400">Redirecting...</p>
      </div>
    );
  }
  const { user, setUser } = userContext;

  const saveToFavourites = () => {
    if (user && meal) {
      const isSaved = user.favouriteRecipes.some(
        (r) => r.idMeal === meal.idMeal
      );
      if (!isSaved) {
        setUser({ ...user, favouriteRecipes: [...user.favouriteRecipes, meal] });
      }
    }
  };

  // Collect ingredients
  const ingredients = Object.keys(meal)
    .filter((key) => key.startsWith("strIngredient") && meal[key as keyof Meal])
    .map((key, i) => ({
      ingredient: meal[key as keyof Meal],
      measure: meal[`strMeasure${i + 1}` as keyof Meal],
    }));

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8">
      <div className="mb-6">
        <BackButton />
      </div>
      <motion.h1 className="text-3xl md:text-4xl font-bold mb-6 text-teal-300" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {meal.strMeal}
      </motion.h1>
      <motion.img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-80 object-cover rounded-xl shadow-lg mb-6" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7, ease: "easeOut" }} />
      <div className="flex gap-4 mb-6">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={saveToFavourites} className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md font-semibold transition-colors">
          ❤️ Save to Favourites
        </motion.button>
        {meal.strYoutube && (
          <motion.a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-red-500 hover:bg-red-500 text-white px-8 py-2 rounded-md font-semibold transition-colors">
            ▶ Watch on YouTube
          </motion.a>
        )}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-3">Instructions</h2>
        <p className="text-gray-100 leading-relaxed">{meal.strInstructions}</p>
      </motion.div>
      <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
        <h2 className="text-2xl font-bold text-gray-200 mb-3">Ingredients</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ingredients.map((ing, i) => (
            <motion.li key={i} variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="bg-gray-900 px-4 py-2 rounded-md shadow-md text-gray-300">
              {ing.ingredient} - <span className="text-gray-200">{ing.measure}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
