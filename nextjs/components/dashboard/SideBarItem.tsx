import Link from "next/link";
import React from "react";

function SideBarItem({ sidebar }: any) {
  return (
    <Link href={sidebar.url}>
      <div className="cursor-pointer relative text-bgWhite p-1 my-2 h-10 flex justify-start items-center w-full rounded-sm">
        {sidebar.icon}
        <h5 className="ml-2 select-none">{sidebar.name}</h5>
      </div>
    </Link>
  );
}

export default SideBarItem;
