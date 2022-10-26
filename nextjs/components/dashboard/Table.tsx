import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

function Table({ data, tableData, paginate, onDataEmmit,onDeleteEmmit, isLoading = false }: any) {
  return (
    <div className="overflow-x-auto z-1">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <TableHeader
          colNames={data?.colNames}
          action={data?.action}
          checkBox={data?.checkBox}
        />
        <TableBody
          colNames={data?.colNames}
          data={tableData}
          action={data?.action}
          checkBox={data?.checkBox}
          onDataEmmit={onDataEmmit}
          onDeleteEmmit={onDeleteEmmit}
          isLoading={isLoading}
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
