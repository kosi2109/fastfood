import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

function Table({ data, paginate, onDataEmmit }: any) {
  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <TableHeader
          colNames={data?.colNames}
          action={data?.action}
          checkBox={data?.checkBox}
        />
        <TableBody
          colNames={data?.colNames}
          data={data?.data}
          action={data?.action}
          checkBox={data?.checkBox}
          onDataEmmit={onDataEmmit}
        />
      </table>

      {paginate && (
        <div className="bg-white w-full h-10 flex items-center justify-center">
          <div className="border-2 rounded-full mx-2 cursor-pointer w-6 h-6 flex items-center justify-center">
            <h5 className="text-sm select-none">1</h5>
          </div>
          <div className="border-2 border-textGreen rounded-full mx-2 cursor-pointer w-6 h-6 flex items-center justify-center">
            <h5 className="text-sm select-none">2</h5>
          </div>
          <div className="border-2 rounded-full mx-2 cursor-pointer w-6 h-6 flex items-center justify-center">
            <h5 className="text-sm select-none">3</h5>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
