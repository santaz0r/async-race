import React from 'react';

import TTableProps from './tableTypes';

type TProps = Pick<TTableProps, 'onSort'> & {
  columns: {
    [key: string]: {
      name: string;
      path: string;
    };
  };
};

function TableHeader({ columns, onSort }: TProps) {
  const handleSort = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onSort(e);
  };
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th key={column} scope="col">
            <button onClick={(e) => handleSort(e)} type="button">
              {columns[column].name}
            </button>
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
