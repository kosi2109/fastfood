import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { allCategory, allMenus, featureCategory } from "../../api";
import Category from "../../components/Category";
import ItemContainer from "../../components/Items/ItemContainer";
import ItemGridContainer from "../../components/Items/ItemGridContainer";
import AppLayout from "../../components/Layouts/AppLayout";
import Loading from "../../components/Loading";
import Search from "../../components/Search";
import { AppState } from "../../context/AppProvider";
import { CATEGORY, MENU } from "../../types/index";

interface Props {
  categories: CATEGORY[];
  featureCate: CATEGORY[];
}

const menu: NextPage<Props> = ({ categories, featureCate }) => {
  const {selectedCategory,setSelectedCategory} = AppState();
  const [menus, setMenus] = useState<MENU[]>([]);
  const [loading, setLoading] = useState(false)
  
  const getMenuByCategory = async (category: string) => {
    const menu = await allMenus(category);
    setMenus(menu.data);
  };

  useEffect(() => {
    setLoading(true);
    if (selectedCategory !== "all") {
      getMenuByCategory(selectedCategory);
      setLoading(false)
    }
  }, [selectedCategory]);

  return (
    <AppLayout title="Menu">
      <Head>
        <title>Menu</title>
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
        featureCate.map((category:CATEGORY)=>(
          <ItemContainer key={category.slug} title={category.name} menus={category.menus} />
        ))
      ) : (
        loading ? "Loading"  : <ItemGridContainer menus={menus} />
      )}
    </AppLayout>
  );
};

export async function getStaticProps() {
  const categories = await allCategory();
  const featureCate = await featureCategory();

  return {
    props: {
      categories: categories.data,
      featureCate: featureCate.data,
    },
  };
}

export default menu;
