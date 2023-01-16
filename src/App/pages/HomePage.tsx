import React, { useState, useEffect } from 'react';
import { crateNewCar, getGarage, updateCar } from '../services/carsService';
import { TCar } from '../types/types';
import CarForm from '../components/CarInput/CarInput';

const initialData = {
  name: '',
  color: '#000000',
};

function HomePage() {
  const [cars, setCars] = useState<TCar[]>([]);
  const [carsLength, setCarsLength] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [createCarData, setCreateCarData] = useState(initialData);
  const [updateCarData, setUpdateCarData] = useState(initialData);
  const [disabledInput, setDisabledInput] = useState(true);

  const getData = async () => {
    const { data, totalCars } = await getGarage();
    setCars(data);
    setCarsLength(totalCars);

    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(carsLength);

  const handleChange = (target: { name: string; value: string }) => {
    setCreateCarData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleUpdateChange = (target: { name: string; value: string }) => {
    setUpdateCarData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleCreateCar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    crateNewCar(createCarData);
    setCreateCarData(initialData);
    getData();
  };

  const handleUpdateCar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateCar(updateCarData);
    setUpdateCarData(initialData);
    setDisabledInput(true);

    getData();
  };

  const handleClick = (car: TCar) => {
    setUpdateCarData(car);
    setDisabledInput(false);
  };

  if (!isLoading) {
    return (
      <>
        <CarForm
          description="Create new car"
          placeholder="Enter new car's name"
          color={createCarData.color}
          name={createCarData.name}
          onAction={handleCreateCar}
          onChange={handleChange}
          disabledInput={false}
        />
        <CarForm
          placeholder="Please, select a car"
          description="Update car"
          color={updateCarData.color}
          name={updateCarData.name}
          onAction={handleUpdateCar}
          onChange={handleUpdateChange}
          disabledInput={disabledInput}
        />

        <div>
          {cars.map((car) => (
            <div key={car.id}>
              <p>{car.id}</p>
              <p>{car.name}</p>
              <p>{car.color}</p>
              <button type="button" onClick={() => handleClick(car)}>
                Select
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }
  return <h1>Loading...</h1>;
}

export default HomePage;
