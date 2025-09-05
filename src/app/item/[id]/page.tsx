import { Meal } from "@/utils/types";
import ItemDetailClient from "@/components/ItemDetailClient";

interface ItemPageProps {
  params: {
    id: string;
  };
}

async function getMealById(id: string): Promise<Meal | null> {
  if (!id || Array.isArray(id)) return null;
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error("Failed to fetch meal:", error);
    return null;
  }
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { id } = await params;
  const meal = await getMealById(id);

  if (!meal) {
    return (
      <div className="text-center p-10">
        <p className="text-lg text-gray-400">Recipe not found.</p>
      </div>
    );
  }

  return <ItemDetailClient meal={meal} />;
}
