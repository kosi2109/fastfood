import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { allCategory, allMenus, featureCategory } from "../../api";
import Category from "../../components/client/Category";
import ItemContainer from "../../components/client/Items/ItemContainer";
import ItemGridContainer from "../../components/client/Items/ItemGridContainer";
import AppLayout from "../../components/Layouts/AppLayout";
import Loading from "../../components/Loading";
import MenuLoading from "../../components/client/MenuLoading";
import Search from "../../components/client/Search";
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
    setMenus(menu.data.data);
  };

  useEffect(() => {
    if (selectedCategory !== "all") {
      getCategory();
    }
    
  }, [selectedCategory]);
  
  const getCategory = async ()=>{
    setLoading(true);
    await getMenuByCategory(selectedCategory);
    setLoading(false);
  }

  return (
    <AppLayout>
      <Head>
        <title>Menu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/6 md:fixed md:top-20">
          <h1 className="text-md font-bold text-textGray">Our Food</h1>
          <h2 className="text-xl mb-2 font-bold text-textGreen">Special For You</h2>
          <Search />
          <Category
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <div className="hidden md:block w-1/6">

        </div>
        <div className="md:w-5/6 md:p-2">
          {selectedCategory === "all" ? (
            featureCate.map((category:CATEGORY)=>(
              <ItemContainer key={category.slug} title={category.name} menus={category.menus} />
            ))
          ) : (
            loading ? <MenuLoading/>  : <ItemGridContainer menus={menus} />
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export async function getStaticProps() {
  const categories = await allCategory();
  const featureCate = await featureCategory();

  return {
    props: {
      categories: categories.data.data,
      featureCate: featureCate.data.data,
    },
  };
}

export default menu;
