import React from 'react';
import { TRespWinner } from '../../types/types';

type TTableProps = {
  winners: TRespWinner[];
  findOption: (key: string, id: number) => string;
  onSort: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default TTableProps;
