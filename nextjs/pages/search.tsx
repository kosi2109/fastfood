import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { searchMenus } from "../api";
import ItemGridContainer from "../components/Items/ItemGridContainer";
import SingleItem from "../components/Items/SingleItem";
import AppLayout from "../components/Layouts/AppLayout";
import { MENU } from "../types";

const Search = () => {
  const [menus, setMenus] = useState<MENU[]>([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (keyword !== ""){
        setLoading(true);
        const delayfunc = setTimeout(()=> search(keyword),1000)
        setLoading(false);

        return ()=> clearTimeout(delayfunc)
    }
  }, [keyword]);

  const search = async (keyword: string) => {
    const res = await searchMenus(keyword);
    setMenus(res.data);
  };


  return (
    <AppLayout back={true} title="Search">
      <div className="w-full relative h-10 text-textGray mb-5">
        <div className="absolute left-0 top-0 h-full w-10 flex justify-center items-center">
          <FiSearch size={20} />
        </div>
        <input
          type="text"
          className="pl-10 text-textBlack w-full h-full border border-textGray flex rounded-md focus:outline-textGray"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        />
      </div>
      { loading ? "Loading" : 
      <ItemGridContainer menus={menus} />
      }
    </AppLayout>
  );
};

export default Search;
