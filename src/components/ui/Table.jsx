import React from 'react';

const Table = ({ columns, data, renderRow, className = '' }) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead className="bg-secondary">
          <tr>
            {columns.map((column, index) => {
              const header = React.isValidElement(column)
                ? column
                : (typeof column === 'object' && column !== null && 'label' in column)
                ? column.label
                : column;

              return (
                <th
                  key={index}
                  className="text-left text-sm e text-tableTh font-medium uppercase px-4 py-3"
                >
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((item, index) => (
            <tr key={index} className="border-b border-gray-100 text-sm  text-tableText last:border-b-0">
              {renderRow(item, index)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
