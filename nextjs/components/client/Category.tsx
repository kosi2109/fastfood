import { NextPage } from "next";
import React from "react";
import { useDispatch } from "react-redux";
import { CATEGORY } from "../../types";
import { changeCategory } from "../../store/slices/commonSlice"
const selected =
  "flex items-center min-w-fit md:h-10 md:mb-2 justify-center md:justify-start cursor-pointer mr-4 border-b-2 border-textGreen font-bold text-lg";
const list =
  "flex min-w-fit md:h-10 md:mb-2 items-center justify-center md:justify-start cursor-pointer mr-4 font-semibold text-md";

interface Props {
  categories: CATEGORY[];
  selectedCategory: string;
}

const Category: NextPage<Props> = ({ categories, selectedCategory }) => {
  const dispatch = useDispatch();


  return (
    <ul className="w-full flex md:flex-col overflow-x-auto py-2 scrollbar-hide mb-3">
      <li
        onClick={() => dispatch(changeCategory('all'))}
        className={selectedCategory === "all" ? selected : list}
      >
        All
      </li>
      {categories.map((category) => (
        <li
          onClick={() => dispatch(changeCategory(category.slug))}
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
