import { TCar } from '../types/types';

enum Responses {
  BASE_URL = 'http://127.0.0.1:3000',
  TotalCountHeader = 'X-Total-Count',
}

enum EPaths {
  garage = 'garage',
  engine = 'engine',
}

async function getGarage(page = 0, limit = 99999999999999) {
  const res = await fetch(`${Responses.BASE_URL}/${EPaths.garage}?_page=${page}&_limit=${limit}`);
  const data = await res.json();

  const totalCars = res.headers.get(Responses.TotalCountHeader)
    ? res.headers.get(Responses.TotalCountHeader)
    : data.length;
  return { data, totalCars: +totalCars };
}

async function createNewCar(carData: TCar) {
  const res = await fetch(`${Responses.BASE_URL}/${EPaths.garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...carData, name: carData.name || 'Unnamed car' }),
  });
  const car = await res.json();
  return car;
}

async function updateCar(carData: TCar) {
  const res = await fetch(`${Responses.BASE_URL}/${EPaths.garage}/${carData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...carData, name: carData.name || 'Unnamed car' }),
  });
  const car = await res.json();
  return car;
}

async function deleteCar(id: TCar['id']) {
  const res = await fetch(`${Responses.BASE_URL}/${EPaths.garage}/${id}`, {
    method: 'DELETE',
  });
  const car = await res.json();
  return car;
}

// engine

async function switchCarEngineStatus(id: number, status: 'started' | 'stopped') {
  const res = await fetch(`${Responses.BASE_URL}/${EPaths.engine}?id=${id}&status=${status}`, {
    method: 'PATCH',
  });
  const data = await res.json();
  return data;
}

async function driveCar(id: number, status: 'drive') {
  const res = await fetch(`${Responses.BASE_URL}/${EPaths.engine}?id=${id}&status=${status}`, {
    method: 'PATCH',
  });

  return res.status;
}

export { getGarage, createNewCar, updateCar, deleteCar, switchCarEngineStatus, driveCar };
