// import React from 'react';
import { TRespWinner } from '../../types/types';

type TTableProps = {
  winners: TRespWinner[];
  findOption: (key: string, id: number) => string;
  onSort: (e: string) => void;
  sortOprions: { sort: string; order: string };
};

export default TTableProps;
