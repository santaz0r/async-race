import { TCar } from '../types/types';

enum Responses {
  BASE_URL = 'http://127.0.0.1:3000',
  TotalCountHeader = 'X-Total-Count',
}

async function getGarage(page: number) {
  const res = await fetch(`${Responses.BASE_URL}/garage?_page=${page}&_limit=7`);
  const data = await res.json();

  const totalCars = res.headers.get(Responses.TotalCountHeader)
    ? res.headers.get(Responses.TotalCountHeader)
    : data.length;
  console.log(data);
  return { data, totalCars: +totalCars };
}

async function createNewCar(carData: TCar) {
  const res = await fetch(`${Responses.BASE_URL}/garage`, {
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
  const res = await fetch(`${Responses.BASE_URL}/garage/${carData.id}`, {
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
  const res = await fetch(`${Responses.BASE_URL}/garage/${id}`, {
    method: 'DELETE',
  });
  const car = await res.json();
  return car;
}

export { getGarage, createNewCar, updateCar, deleteCar };
