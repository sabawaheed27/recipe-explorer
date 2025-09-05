
import { MealSummary } from "@/utils/types";
import CategoryPageClient from "./index";

interface CategoryDetailPageProps {
  params: {
    category: string;
  };
}

async function getMealsByCategory(category: string): Promise<MealSummary[]> {
  try {
    const encodedCategory = encodeURIComponent(category);
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodedCategory}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Failed to fetch meals:", error);
    return [];
  }
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { category } = params;
  const meals = await getMealsByCategory(category);

  return <CategoryPageClient meals={meals} category={category} />;
}
