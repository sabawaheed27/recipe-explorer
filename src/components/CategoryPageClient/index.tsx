"use client";

import CategoryDetailClient from "@/components/CategoryDetailClient";
import { MealSummary } from "@/utils/types";

interface CategoryPageClientProps {
  meals: MealSummary[];
  category: string;
}

export default function CategoryPageClient({
  meals,
  category,
}: CategoryPageClientProps) {
  return (
    <CategoryDetailClient initialMeals={meals} category={category} />
  );
}


// Server component (CategoryDetailPage)
// Fetches meals from the API.
// Passes them as props to CategoryPageClient.
// Client component (CategoryPageClient)
// Receives meals + category.
// Displays the category name at the top.
// Checks if meals exist. If not, shows a fallback message.
// Maps through the meals array and renders each meal (thumbnail + name).