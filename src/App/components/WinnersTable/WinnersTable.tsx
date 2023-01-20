import Table from './Table';
import TTableProps from './tableTypes';
import { ReactComponent as CarLogo } from '../../assets/car-2901.svg';

function WinnersTable({ winners, findOption, onSort }: TTableProps) {
  const columns = {
    number: {
      path: 'number',
      name: '#',
    },
    name: {
      path: 'name',
      name: 'Car name',
    },
    color: {
      path: 'color',
      name: 'Color',
      // eslint-disable-next-line react/no-unstable-nested-components
      component: (color: string) => <CarLogo fill={color} width="30px" height="30px" />,
    },
    wins: {
      path: 'wins',
      name: 'Wins',
    },
    time: { path: 'time', name: 'Time' },
  };
  return <Table columns={columns} data={winners} findOption={findOption} onSort={onSort} winners={[]} />;
}

export default WinnersTable;
