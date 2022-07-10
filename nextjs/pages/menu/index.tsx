import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { allCategory, allMenus } from "../../api";
import Category from "../../components/Category";
import ItemContainer from "../../components/Items/ItemContainer";
import SingleItem from "../../components/Items/SingleItem";
import AppLayout from "../../components/Layouts/AppLayout";
import Search from "../../components/Search";
import { CATEGORY, MENU } from "../../types/index";

interface Props {
  categories: CATEGORY[];
  topOfWeek: MENU[];
  malarShanKaw: MENU[];
}

const menu: NextPage<Props> = ({ categories, topOfWeek, malarShanKaw }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [menus, setMenus] = useState<MENU[]>([]);

  
  const getMenuByCategory = async (category: string) => {
    const menu = await allMenus(category);
    setMenus(menu.data);
  };

  useEffect(() => {
    if (selectedCategory !== "all") {
      getMenuByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <AppLayout title="Menu">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-md font-bold text-textGray">Our Food</h1>
      <h2 className="text-xl mb-2 font-bold text-textGreen">Special For You</h2>
      <Search />
      <Category
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {selectedCategory === "all" ? (
        <>
          <ItemContainer title="Top Of Week" menus={topOfWeek} />
          <ItemContainer title="Malar Shan Kaw" menus={malarShanKaw} />
        </>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1">
          {menus.map((menu) => (
            <SingleItem key={menu.slug} menu={menu} />
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export async function getStaticProps() {
  const categories = await allCategory();
  const topOfWeek = await allMenus("top-of-week");
  const malarShanKaw = await allMenus("malar-shan-kaw");

  return {
    props: {
      categories: categories.data,
      topOfWeek: topOfWeek.data,
      malarShanKaw: malarShanKaw.data,
    },
  };
}

export default menu;
