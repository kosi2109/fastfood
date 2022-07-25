import { MENU } from "../../types";
import SingleItem from "./SingleItem";


const ItemGridContainer = ({menus} : {menus:MENU[]})=>{
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1">
        {menus.map((menu) => (
          <SingleItem key={menu.slug} menu={menu} />
        ))}
      </div>
    )
}


export default ItemGridContainer;