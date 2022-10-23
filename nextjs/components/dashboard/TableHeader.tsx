import React from "react";

function TableHeader({ colNames, checkBox = false, action = false }: any) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {checkBox && (
          <th scope="col" className="p-4">
            <div className="flex items-center">
              <input
                id="checkbox-all-search"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="checkbox-all-search" className="sr-only">
                checkbox
              </label>
            </div>
          </th>
        )}

        {colNames?.map((col : any,i : number) => (
            <th scope="col" key={i} className="py-3 px-6">
            {col?.name}
            </th>
        ))}

        {action && (
          <th scope="col" className="py-3 px-6">
            Action
          </th>
        )}
      </tr>
    </thead>
  );
}

export default TableHeader;
