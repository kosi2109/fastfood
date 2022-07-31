import { MENU } from "../../types";
import SingleItem from "./SingleItem";

const ItemGridContainer = ({ menus }: { menus: MENU[] }) => {
  return (
    <>
    {menus.length > 0 ?
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1">
        {menus.map((menu) => (
          <SingleItem key={menu.slug} menu={menu} />
        ))}
      </div>
     :
      <h2 className="font-bold text-center mt-4 text-xl">No Items Available .</h2>
     }
    </>
  );
};

export default ItemGridContainer;
