// utils/types.ts
export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions?: string;
  strYoutube?: string;
  [key: string]: string | undefined;
};

export type MealSummary = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export interface UserType {
  name: string;
  password: string;
  favouriteCategory: string[];   // supports multiple categories
  favouriteRecipes: Meal[];      // store full meal objects
}

export interface UserContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  logout: () => void;  
}
