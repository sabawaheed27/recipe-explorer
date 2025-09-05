


"use client";

import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { Meal } from "@/utils/types";
import Image from "next/image";

export default function RecipeDetails() {
  const { idMeal } = useParams();
  const userContext = useContext(UserContext);
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idMeal || !userContext?.user) return;

    const savedMeal = userContext.user.favouriteRecipes.find(
      (r) => r.idMeal === idMeal
    );
    if (savedMeal) {
      setMeal(savedMeal);
      setLoading(false);
      return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.meals) {
          setMeal(data.meals[0]);
        } else {
          setMeal(null);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [idMeal, userContext]);

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500 animate-pulse">
        Loading recipe...
      </div>
    );

  if (!userContext || !userContext.user) {
    return <p>Loading user...</p>;
  }

  if (!meal)
    return (
      <div className="text-center py-10 text-red-500 font-semibold">
        Recipe not found
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
        {meal.strMeal}
      </h1>

      {/* Food image (optimized) */}
      <Image
        src={meal.strMealThumb}
        alt={meal.strMeal}
        width={600}
        height={400}
        className="w-full rounded-xl shadow-md mb-6"
      />

      {/* Instructions */}
      <h2 className="text-2xl font-semibold mb-3 border-b pb-2 text-gray-800">
        Instructions
      </h2>
      <p className="mb-6 leading-relaxed text-gray-700 whitespace-pre-line">
        {meal.strInstructions}
      </p>

      {/* Video */}
      {meal.strYoutube && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 border-b pb-2 text-gray-800">
            Video Tutorial
          </h2>
          <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${
                meal.strYoutube.split("v=")[1]
              }`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Ingredients */}
      <h2 className="text-2xl font-semibold mb-3 border-b pb-2 text-gray-800">
        Ingredients
      </h2>
      <ul className="bg-gray-50 p-4 rounded-lg shadow-sm list-disc pl-6 space-y-1 text-gray-700">
        {Array.from({ length: 20 }, (_, i) => i + 1)
          .map((n) => ({
            ingredient: meal?.[`strIngredient${n}` as keyof Meal],
            measure: meal?.[`strMeasure${n}` as keyof Meal],
          }))
          .filter((item) => item.ingredient)
          .map((item, idx) => (
            <li key={idx}>
              <span className="font-medium">{item.ingredient}</span> -{" "}
              {item.measure}
            </li>
          ))}
      </ul>
    </div>
  );
}
