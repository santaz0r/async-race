import React from 'react';
import styles from './TableHeader.module.scss';

import TTableProps from './tableTypes';

type TProps = Pick<TTableProps, 'onSort'> &
  Pick<TTableProps, 'sortOprions'> & {
    columns: {
      [key: string]: {
        name: string;
        path: string;
        isSort: boolean;
      };
    };
  };

function TableHeader({ columns, onSort, sortOprions }: TProps) {
  const handleSort = (path: string) => {
    onSort(path);
  };

  const renderArrow = (options: TTableProps['sortOprions'], path: string) => {
    if (options.sort === path) {
      if (options.order === 'ASC') {
        return `${styles.sort_btn_asc}`;
      }
      return `${styles.sort_btn_desc}`;
    }
    return null;
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th key={column} scope="col">
            {columns[column].isSort ? (
              <button
                className={`${styles.sort_btn} ${renderArrow(sortOprions, columns[column].path)}`}
                onClick={() => handleSort(columns[column].path)}
                type="button"
              >
                {columns[column].name}
              </button>
            ) : (
              columns[column].name
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
