import { TRespWinner } from '../../types/types';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TTableProps from './tableTypes';

type TProps = TTableProps & {
  data: TRespWinner[];
  columns: {
    [key: string]: {
      name: string;
      path: string;
    };
  };
};

function Table({ columns, data, findOption, onSort }: TProps) {
  return (
    <table>
      <TableHeader {...{ columns, onSort }} />
      <TableBody {...{ columns, data, findOption }} />
    </table>
  );
}

export default Table;
