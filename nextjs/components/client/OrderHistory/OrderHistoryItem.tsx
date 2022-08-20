import { NextPage } from "next";
import { ORDER_ITEM } from "../../../types";

interface Props {
    item : ORDER_ITEM
}

const OrderHistoryItem: NextPage<Props> = ({item})  => {
  return (
    <div className="flex flex-col items-center justify-start p-3">
      <div className="flex w-full justify-between py-1">
        <div className="w-1/2">
          <h5 className="font-semibold pr-1">{item.menu_name} ({item.size})</h5>
        </div>
        <div className="w-1/2 flex justify-between">
          <h5 className="text-textGray">{item.quantity} pcs</h5>
          <h5>{item.quantity * item.price}</h5>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryItem;
