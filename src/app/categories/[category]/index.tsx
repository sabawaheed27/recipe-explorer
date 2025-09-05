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
