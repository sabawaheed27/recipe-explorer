

"use client";
import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { UserContext } from "@/context/UserContext";
import { Heart } from "lucide-react";


type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const userContext = useContext(UserContext);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories));
  }, []);

  if (!userContext) {
    return null; // Or a loading spinner
  }
  const { user, setUser } = userContext;

  const saveFavCategory = (cat: string) => {
    if (user) {
      const updatedCategories = user.favouriteCategory.includes(cat)
        ? user.favouriteCategory
        : [...user.favouriteCategory, cat];
      setUser({ ...user, favouriteCategory: updatedCategories });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-200">Categories</h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}>
        {categories.map((cat) => (
          <motion.div
            key={cat.idCategory}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col justify-between bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-teal-500/40 transition-all duration-300">
            <Link href={`/categories/${cat.strCategory}`} className="block">
                  <Image
                src={cat.strCategoryThumb}
                alt={cat.strCategory}
                width={400}
                height={200}
                className="w-full h-48 sm:h-52 object-cover"/>
            </Link>
           <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="font-bold text-lg text-teal-300 truncate">
                  {cat.strCategory}
                </h2>
                <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                  {cat.strCategoryDescription}
                </p>
              </div>

              <div className="mt-4 flex justify-between gap-2">
                <Link
                  href={`/categories/${cat.strCategory}`}
                  className="flex-1 bg-teal-600 hover:bg-teal-500 text-white px-3 py-2 rounded-md text-center font-semibold transition-all duration-300">
                  Explore
                </Link>
                <button
                  onClick={() => saveFavCategory(cat.strCategory)}
                  className="flex items-center gap-1 bg-pink-400 hover:bg-pink-500 text-white px-3 py-2 rounded-md font-semibold transition-all duration-300">
                  <Heart className="w-5 h-5" />
                  Fav
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

//This page fetches all food categories, displays them in
// a slick animated grid of cards, and lets logged-in users save favourite categories.
// The experience is personalized through UserContext, while Framer Motion makes it feel alive