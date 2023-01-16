import { TCar } from '../types/types';

const BASE_URL = 'http://127.0.0.1:3000';

async function getGarage() {
  const res = await fetch(`${BASE_URL}/garage`);
  const data = await res.json();

  const totalCars = res.headers.get('X-Total-Count') ? res.headers.get('X-Total-Count') : data.length;
  console.log(data);
  return { data, totalCars: +totalCars };
}

async function crateNewCar(carData: TCar) {
  const res = await fetch(`${BASE_URL}/garage`, {
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
  const res = await fetch(`${BASE_URL}/garage/${carData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...carData, name: carData.name || 'Unnamed car' }),
  });
  const car = await res.json();
  return car;
}

export { getGarage, crateNewCar, updateCar };
