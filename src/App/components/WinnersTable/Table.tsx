import { TRespWinner } from '../../types/types';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TTableProps from './tableTypes';
import styles from './Table.module.scss';

type TProps = TTableProps & {
  data: TRespWinner[];
  columns: {
    [key: string]: {
      name: string;
      path: string;
      isSort: boolean;
    };
  };
  currentPage: number;
};

function Table({ columns, data, findOption, onSort, sortOprions, currentPage }: TProps) {
  return (
    <table className={styles.winner_table}>
      <TableHeader {...{ columns, onSort, sortOprions }} />
      <TableBody {...{ columns, data, findOption, currentPage }} />
    </table>
  );
}

export default Table;
