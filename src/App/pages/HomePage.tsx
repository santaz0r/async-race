import React, { useState, useEffect } from 'react';
import {
  createNewCar,
  deleteCar,
  driveCar,
  getGarage,
  switchCarEngineStatus,
  updateCar,
} from '../services/carsService';
import { TCar, engineStatus } from '../types/types';
import CarForm from '../components/CarInput/CarInput';
import CarsList from '../components/CarsList/CarsList';
import Pagination from '../components/Pagination/Pagination';
import generateCar from '../utils/generateCar';

enum Constants {
  startLength = 0,
  startPage = 1,
  pageSize = 7,
  limitToGenerate = 100,
}
const initialData = {
  name: '',
  color: '#000000',
};

function HomePage() {
  const [cars, setCars] = useState<TCar[]>([]);
  const [enginesStatus, setEnginesStatus] = useState<engineStatus>({});

  const [carsLength, setCarsLength] = useState(Constants.startLength);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentpage] = useState(Constants.startPage);
  const [createCarData, setCreateCarData] = useState(initialData);
  const [updateCarData, setUpdateCarData] = useState(initialData);
  const [disabledInput, setDisabledInput] = useState(true);
  const itemsOnPage = Constants.pageSize;

  const getData = async () => {
    const { data, totalCars } = await getGarage(currentPage);
    setCars(data);
    setCarsLength(totalCars);
    if (data.length === 0) setCurrentpage((prev) => (prev - 1 ? prev - 1 : 1));
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  const toDrive = async (id: number) => {
    const status = await driveCar(id, 'drive');
    setEnginesStatus((prev) => ({
      ...prev,
      [id]: {
        status: 'drive',
        velocity: prev[id].velocity,
        distance: prev[id].distance,
      },
    }));

    console.log(status);
    switch (status) {
      case 200:
        setEnginesStatus((prev) => ({
          ...prev,
          [id]: {
            status: 'finished',
            velocity: prev[id].velocity,
            distance: prev[id].distance,
          },
        }));
        break;
      case 500:
        setEnginesStatus((prev) => ({
          ...prev,
          [id]: {
            status: 'broken',
            velocity: prev[id].velocity,
            distance: prev[id].distance,
          },
        }));
        break;

      default:
        console.log(status);
        break;
    }
  };

  const engineSwitcher = async (id: number, status: 'started' | 'stopped') => {
    const engine = await switchCarEngineStatus(id, status);
    setEnginesStatus((prev) => ({
      ...prev,
      [id]: {
        status,
        velocity: engine.velocity,
        distance: engine.distance,
      },
    }));

    if (status === 'started') await toDrive(id);
  };

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

  const handleCreateCar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createNewCar(createCarData);
    setCreateCarData(initialData);

    getData();
  };

  const handleUpdateCar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateCar(updateCarData);
    setUpdateCarData(initialData);
    setDisabledInput(true);

    getData();
  };

  const handleClick = (car: TCar) => {
    setUpdateCarData(car);
    setDisabledInput(false);
  };

  const handleDelete = async (id: number) => {
    await deleteCar(id);

    getData();
  };

  const handlePageChange = (page: number) => {
    setCurrentpage(page);
  };

  const handleGenerate = () => {
    for (let i = 0; i < 4; i += 1) {
      createNewCar(generateCar());
    }
    getData();
  };
  const handleRace = () => {
    for (let i = 1; i <= Constants.pageSize; i += 1) {
      engineSwitcher(i + Constants.pageSize * (currentPage - 1), 'started');
    }
  };

  console.log(enginesStatus);
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
          description="Update car"
          placeholder="Please, select a car"
          color={updateCarData.color}
          name={updateCarData.name}
          onAction={handleUpdateCar}
          onChange={handleUpdateChange}
          disabledInput={disabledInput}
        />
        <button type="button" onClick={handleGenerate}>
          GENERATE 100 cars
        </button>
        <button type="button" onClick={handleRace}>
          race
        </button>
        {cars.length ? (
          <div>
            Garage: {carsLength}
            <Pagination
              currentPage={currentPage}
              itemsCount={carsLength}
              onPageChange={handlePageChange}
              pageSize={itemsOnPage}
            />
            <CarsList
              cars={cars}
              enginesData={enginesStatus}
              handleClick={handleClick}
              onDelete={handleDelete}
              onStart={engineSwitcher}
              onStopped={engineSwitcher}
            />
          </div>
        ) : (
          <h1>OOPS, it`&apos;s empty</h1>
        )}
      </>
    );
  }
  return <h1>Loading...</h1>;
}

export default HomePage;
