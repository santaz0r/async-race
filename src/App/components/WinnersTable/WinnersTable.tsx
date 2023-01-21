import Table from './Table';
import TTableProps from './tableTypes';
import { ReactComponent as CarLogo } from '../../assets/car-2901.svg';

function WinnersTable({
  winners,
  findOption,
  onSort,
  sortOprions,
  currentPage,
}: TTableProps & { currentPage: number }) {
  const columns = {
    number: {
      path: 'number',
      name: '#',
      isSort: false,
    },
    name: {
      path: 'name',
      name: 'Car name',
      isSort: false,
    },
    color: {
      path: 'color',
      name: 'Color',
      isSort: false,
      // eslint-disable-next-line react/no-unstable-nested-components
      component: (color: string) => <CarLogo fill={color} width="50px" height="50px" />,
    },
    wins: {
      path: 'wins',
      name: 'Wins',
      isSort: true,
    },
    time: { path: 'time', name: 'Time', isSort: true },
  };
  return (
    <Table
      sortOprions={sortOprions}
      columns={columns}
      data={winners}
      findOption={findOption}
      onSort={onSort}
      winners={[]}
      currentPage={currentPage}
    />
  );
}

export default WinnersTable;
