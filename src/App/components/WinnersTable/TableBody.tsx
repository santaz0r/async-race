import { Constants, TRespWinner } from '../../types/types';

type TProps = {
  data: TRespWinner[];
  columns: {
    [key: string]: {
      component?: (winner: string) => JSX.Element;
      name: string;
      path: string;
      isSort: boolean;
    };
  };
  findOption: (key: string, id: number) => string;
  currentPage: number;
};

function TableBody({ data, columns, findOption, currentPage }: TProps) {
  const renderContent = (item: TRespWinner, column: string) => {
    if (columns[column].component) {
      const { component } = columns[column];
      if (typeof component === 'function') {
        return component(findOption(columns[column].path, item.id));
      }
      return component;
    }
    return findOption(columns[column].path, item.id);
  };
  return (
    <tbody>
      {data.map((item, index) => (
        <tr key={item.id}>
          {Object.keys(columns).map((column) => (
            <td key={column}>
              {item[column as keyof typeof item] ||
                renderContent(item, column) ||
                index + 1 + (currentPage - 1) * Constants.winnersLimit}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
