import React from "react";
import { CATEGORY } from "../../types";

const selected =
  "flex items-center min-w-fit md:h-10 md:mb-2 justify-center md:justify-start cursor-pointer mr-4 border-b-2 border-textGreen font-bold text-lg";
const list = "flex min-w-fit md:h-10 md:mb-2 items-center justify-center md:justify-start cursor-pointer mr-4 font-semibold text-md";


const Category = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: CATEGORY[];
  selectedCategory: string;
  setSelectedCategory: any;
}) => {
  return (
      <ul className="w-full flex md:flex-col overflow-x-auto py-2 scrollbar-hide mb-3">
        <li
          onClick={() => setSelectedCategory("all")}
          className={selectedCategory === "all" ? selected : list}
        >
          All
        </li>
        {categories.map((category) => (
          <li
            onClick={() => setSelectedCategory(category.slug)}
            key={category.slug}
            className={category.slug === selectedCategory ? selected : list}
          >
            {category.name.toUpperCase()}
          </li>
        ))}
      </ul>
  
  );
};

export default Category;
