import { NextPage } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { featureCategory, searchMenus } from "../api";
import ItemContainer from "../components/Items/ItemContainer";
import ItemGridContainer from "../components/Items/ItemGridContainer";
import AppLayout from "../components/Layouts/AppLayout";
import { CATEGORY, MENU } from "../types";

interface Props {
  categories: CATEGORY[];
}

const Search: NextPage<Props> = ({ categories }) => {
  const [menus, setMenus] = useState<MENU[]>([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (keyword !== "") {
      setLoading(true);
      const delayfunc = setTimeout(() => {
        search(keyword)
      } , 500);
      return () => clearTimeout(delayfunc);
    }
  }, [keyword]);
  
  const search = useCallback(async (keyword: string)=>{
    const res = await searchMenus(keyword);
    setMenus(res.data);
    setLoading(false);
  },[])

  return (
    <AppLayout back={true} title="Search">
      <div className="w-full relative h-10 text-textGray mb-5">
        <div className="absolute left-0 top-0 h-full w-10 flex justify-center items-center">
          <FiSearch size={20} />
        </div>
        <input
          placeholder="Search Menu"
          type="text"
          className="px-9 h-full text-textBlack w-full h-full border border-textGray flex rounded-md focus:outline-textGray"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          autoFocus
        />
        {keyword.length > 0 && (
          <div className="absolute right-0 top-0 h-full w-10 flex justify-center items-center">
            <button
              onClick={() => setKeyword("")}
              className="flex items-center justify-center w-6 h-full"
            >
              <IoMdClose />
            </button>
          </div>
        )}
      </div>

      {keyword == "" ? (
        <>
          <h3 className="text-lg font-bold mb-3">Suggestion for you ...</h3>
          {categories.map((category: any) => (
            <ItemContainer
              key={category.slug}
              title={category.name}
              menus={category.menus}
            />
          ))}
        </>

      ) : loading ? (
        <h2>Loading</h2>
        ) : (
        <ItemGridContainer menus={menus} />
      )}
    </AppLayout>
  );
};

export async function getServerSideProps() {
  const categories = await featureCategory();
  return {
    props: {
      categories: categories.data,
    },
  };
}

export default Search;
