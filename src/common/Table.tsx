// TableThree.js
import React from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const TableThree = ({ data, columns, onDelete, onView, onUpdate }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {columns.map((column, index) => (
                <th key={index} className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  {column.header}
                </th>
              ))}
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td key={column.field} className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {item[column.field]}
                      </h5>
                    </td>
                  ))}
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button className="hover:text-primary" aria-label="View" onClick={() => onView(item)}>
                        <FaEye />
                      </button>
                      <button className="hover:text-primary" aria-label="Edit" onClick={() => onUpdate(item)}>
                        <FaEdit />
                      </button>
                      <button className="hover:text-primary" aria-label="Delete" onClick={() => onDelete(item)}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-5">
                  No tools found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
