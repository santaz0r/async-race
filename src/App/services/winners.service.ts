import { TRespWinner } from '../types/types';

enum Responses {
  BASE_URL = 'http://127.0.0.1:3000',
  TotalCountHeader = 'X-Total-Count',
}

async function getWinners(page: number, sortBy = '', order = '') {
  const res = await fetch(`${Responses.BASE_URL}/winners?&_sort=${sortBy}&_order=${order}&_limit=10&_page=${page}`);
  const data = await res.json();

  const totalWinners = res.headers.get(Responses.TotalCountHeader)
    ? res.headers.get(Responses.TotalCountHeader)
    : data.length;
  return { data, totalWinners: +totalWinners };
}

async function getWinner(id: number): Promise<TRespWinner> {
  const res = await fetch(`${Responses.BASE_URL}/winners/${id}`);
  const data = await res.json();

  return data;
}

async function createWinner(winnerData: TRespWinner) {
  const res = await fetch(`${Responses.BASE_URL}/winners`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winnerData),
  });
  const winner = await res.json();
  return winner;
}

async function updateWinner(winnerData: TRespWinner) {
  const res = await fetch(`${Responses.BASE_URL}/winners/${winnerData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winnerData),
  });
  const winner = await res.json();
  return winner;
}

async function deleteWinner(id: TRespWinner['id']) {
  const res = await fetch(`${Responses.BASE_URL}/winners/${id}`, {
    method: 'DELETE',
  });
  const winner = await res.json();
  return winner;
}

export { getWinners, getWinner, updateWinner, createWinner, deleteWinner };
