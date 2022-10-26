import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

function TableBody({
  colNames,
  data,
  onDataEmmit,
  onDeleteEmmit,
  checkBox = false,
  action = false,
  isLoading,
}: any) {

  return (
    <>
      {isLoading ? (
        <tbody>
          <tr className="py-3">
            <td className="text-center" colSpan={colNames.length + (action ? 1 : 0) + (checkBox ? 1 : 0) }>
              Loading . . .
            </td>
          </tr>

        </tbody>
      ) : (
        <tbody>
          {data?.map((d: any) => (
            <tr
              key={d.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              {checkBox && (
                <td className="p-4 w-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
              )}
              {colNames?.map((col: any, i: number) => {
                if (col.image) {
                  return (
                    <td key={`row-${d.id}-${i}`} className="py-4 px-6">
                      <img src={d[col.key]} width="50px" alt="" />
                    </td>
                  );
                } else if (col.nusted) {
                  return (
                    <td key={`row-${d.id}-${i}`} className="py-4 px-6">
                      <div className="flex">
                        {d[col.key]?.map((n: any , i : number) => (
                          <div key={i} className="border rounded-full mx-1 w-5 flex justify-center items-center">
                            {n[col?.nustedKey]}
                          </div>
                        ))}
                      </div>
                    </td>
                  );
                } else {
                  return (
                    <td key={`row-${d.id}-${i}`} className="py-4 px-6">
                      {d[col.key]}
                    </td>
                  );
                }
              })}
              {action && (
                <td className="flex items-center py-4 px-6 space-x-3">
                  <button
                    onClick={() => onDataEmmit(d)}
                    className="hover:text-yellow-400"
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    onClick={() => onDeleteEmmit(d)}
                    className="hover:text-rose-400"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      )}
    </>
  );
}

export default TableBody;
