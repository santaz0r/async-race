import { TRespWinner } from '../types/types';

enum Responses {
  BASE_URL = 'http://127.0.0.1:3000',
  TotalCountHeader = 'X-Total-Count',
}

async function getWinners(page: number, sortBy = '', order = '') {
  const res = await fetch(`${Responses.BASE_URL}/winners?&_sort=${sortBy}&_order=${order}&_limit=10&_page=${page}`);
  const data = (await res.json()) as TRespWinner[];

  const totalWinners = res.headers.get(Responses.TotalCountHeader)
    ? res.headers.get(Responses.TotalCountHeader)
    : data.length;
  return { data, totalWinners: totalWinners ? +totalWinners : 0 };
}

async function getWinner(id: number): Promise<TRespWinner> {
  const res = await fetch(`${Responses.BASE_URL}/winners/${id}`);
  const data = (await res.json()) as TRespWinner;

  return data;
}

async function createWinner(winnerData: TRespWinner) {
  await fetch(`${Responses.BASE_URL}/winners`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winnerData),
  });
}

async function updateWinner(winnerData: TRespWinner) {
  await fetch(`${Responses.BASE_URL}/winners/${winnerData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winnerData),
  });
}

async function deleteWinner(id: TRespWinner['id']) {
  await fetch(`${Responses.BASE_URL}/winners/${id}`, {
    method: 'DELETE',
  });
}

export { getWinners, getWinner, updateWinner, createWinner, deleteWinner };
