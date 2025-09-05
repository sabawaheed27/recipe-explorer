
import { MealSummary } from "@/utils/types";
import CategoryPageClient from "@/components/CategoryPageClient";

interface CategoryDetailPageProps {
  params: {  // `params` comes from the dynamic segment [category] in the route.

    category: string;
  };
}

async function getMealsByCategory(category: string): Promise<MealSummary[]> {
  try { // - Encodes it for safety (avoids URL issues with spaces/special chars)
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
  const category = params.category; 
  const meals = await getMealsByCategory(category);

    // Render the client-side component, passing the fetched meals and category name as props.
    // This separation keeps data fetching on the server, while interactivity happens on the client.

  return <CategoryPageClient meals={meals} category={category} />;
}


// You visit /categories/Seafood
// Next.js calls CategoryDetailPage with params = { category: "Seafood" }.

// Server fetch
// → getMealsByCategory("Seafood") calls TheMealDB API:
// https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood

// Data returned
//  You get a list of meals (id, name, thumbnail).

// Render client component
// → The CategoryPageClient receives the meals + category as props and renders the UI with animations, interactions, etc.