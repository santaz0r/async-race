import React, { useState, useEffect } from 'react';
import {
  createNewCar,
  deleteCar,
  driveCar,
  getGarage,
  switchCarEngineStatus,
  updateCar,
} from '../services/carsService';
import { TCar, TRespWinner, engineStatus } from '../types/types';
import CarForm from '../components/CarInput/CarInput';
import CarsList from '../components/CarsList/CarsList';
import Pagination from '../components/Pagination/Pagination';
import generateCar from '../utils/generateCar';
import styles from './HomePage.module.scss';
import { createWinner, deleteWinner, getWinner, getWinners, updateWinner } from '../services/winners.service';
import WinnersTable from '../components/WinnersTable/WinnersTable';

enum Constants {
  startLength = 0,
  startPage = 1,
  pageSize = 7,
  limitToGenerate = 100,
  winnersLimit = 10,
}
const initialData = {
  name: '',
  color: '#000000',
};

function HomePage() {
  const [AllCars, setAllCars] = useState<TCar[]>([]);

  const [cars, setCars] = useState<TCar[]>([]);
  const [winners, setWinners] = useState<TRespWinner[]>([]);
  const [enginesStatus, setEnginesStatus] = useState<engineStatus>({});

  const [carsLength, setCarsLength] = useState(Constants.startLength);
  const [winnersLength, setWinnersLength] = useState(Constants.startLength);
  const [isAllCarsLoading, setAllCarsIsLoading] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [isWinnerLoading, setWinnerIsLoading] = useState(true);
  const [currentPage, setCurrentpage] = useState(Constants.startPage);
  const [currentWinnersPage, setCurrenWinnerstpage] = useState(Constants.startPage);
  const [createCarData, setCreateCarData] = useState(initialData);
  const [updateCarData, setUpdateCarData] = useState(initialData);
  const [disabledInput, setDisabledInput] = useState(true);
  const [hasWinner, setHasWinner] = useState(false);
  const [sortOption, setSortOption] = useState({ sort: '', order: '' });

  const [isRace, setIsRace] = useState(false);
  const [isResetActive, setIsResetActive] = useState(false);

  const [isHome, setIsHome] = useState(true);

  const itemsOnPage = Constants.pageSize;

  const getAllCars = async () => {
    const { data } = await getGarage();
    setAllCars(data);
    setAllCarsIsLoading(false);
  };

  const getData = async () => {
    const { data, totalCars } = await getGarage(currentPage, Constants.pageSize);
    setCars(data);
    setCarsLength(totalCars);
    if (data.length === 0) setCurrentpage((prev) => (prev - 1 ? prev - 1 : 1));
    setIsLoading(false);
  };

  const getWinnersData = async () => {
    const { order, sort } = sortOption;
    const { data, totalWinners } = await getWinners(currentWinnersPage, sort, order);
    setWinners(data);
    setWinnersLength(totalWinners);
    setWinnerIsLoading(false);
  };

  useEffect(() => {
    getAllCars();
  }, []);

  useEffect(() => {
    getData();
  }, [currentPage]);

  useEffect(() => {
    getWinnersData();
  }, [sortOption, currentWinnersPage]);

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
    getAllCars();
  };

  const handleUpdateCar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateCar(updateCarData);
    setUpdateCarData(initialData);
    setDisabledInput(true);

    getData();
    getAllCars();
  };

  const handleClick = (car: TCar) => {
    setUpdateCarData(car);
    setDisabledInput(false);
  };

  const handleDelete = async (id: number) => {
    await deleteCar(id);
    await deleteWinner(id);

    getData();
    getWinnersData();
  };

  const handlePageChange = (page: number) => {
    setCurrentpage(page);
  };
  const handleWinnersPageChange = (page: number) => {
    setCurrenWinnerstpage(page);
  };

  const handleGenerate = () => {
    for (let i = 0; i < 4; i += 1) {
      createNewCar(generateCar());
    }
    getData();
  };
  const handleRace = async () => {
    setIsRace(true);
    setIsResetActive(true);
    await Promise.all(cars.map((i) => engineSwitcher(i.id!, 'started')));
    setIsResetActive(false);
  };

  const handleRecet = async () => {
    setIsResetActive(true);
    await Promise.all(cars.map((i) => engineSwitcher(i.id!, 'stopped')));
    setHasWinner(false);
    setIsRace(false);
    setIsResetActive(false);
  };

  const switchPageToHome = () => {
    setIsHome(true);
  };
  const switchPageToWinners = () => {
    setIsHome(false);
  };

  const findWinnerCar = (key: string, id: number) =>
    AllCars.map((j) => {
      if (j.id === id) return j[key as keyof TCar];
      return null;
    })
      .filter((i) => i)
      .join('');

  const getChampion = async (id: number) => {
    setHasWinner(true);
    const winnerData = {
      id,
      time: +(enginesStatus[id].distance / 1000 / enginesStatus[id].velocity).toFixed(2),
    };
    console.log(winnerData);
    const data = await getWinner(id);
    if (Object.keys(data).length) {
      const newData: TRespWinner = {
        id,
        wins: data.wins + 1,
        time: winnerData.time < data.time ? winnerData.time : data.time,
      };
      await updateWinner(newData);
    } else {
      await createWinner({ ...winnerData, wins: 1 });
    }

    getWinnersData();
  };
  Object.keys(enginesStatus).map((id) => {
    if (enginesStatus[+id].status === 'finished' && !hasWinner && isRace) {
      getChampion(+id);
    }
    return null;
  });
  const handleSort = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const sort = e.currentTarget.textContent?.toLocaleLowerCase() as string;
    if (sort === 'wins' || sort === 'time') {
      setSortOption((prev) => ({ sort, order: prev.order === 'ASC' && prev.sort === sort ? 'DESC' : 'ASC' }));
    }
  };
  const isKekwing = (id: number) =>
    enginesStatus[id]
      ? enginesStatus[id].status === 'started' ||
        enginesStatus[id].status === 'broken' ||
        enginesStatus[id].status === 'finished'
      : false;

  const isSingleDriving = () =>
    Object.keys(enginesStatus).length
      ? Object.keys(enginesStatus).some((id) => enginesStatus[+id].status !== 'stopped')
      : false;

  console.log(sortOption);
  console.log(enginesStatus);
  if (!isLoading && !isWinnerLoading && !isAllCarsLoading) {
    return (
      <>
        <nav>
          <ul>
            <li>
              <button onClick={switchPageToHome} type="button">
                home
              </button>
            </li>
            <li>
              <button onClick={switchPageToWinners} type="button">
                winners
              </button>
            </li>
          </ul>
        </nav>
        <div className={!isHome ? styles.hidden : ''}>
          <CarForm
            isRace={isRace}
            description="Create new car"
            placeholder="Enter new car's name"
            color={createCarData.color}
            name={createCarData.name}
            onAction={handleCreateCar}
            onChange={handleChange}
            disabledInput={false}
          />
          <CarForm
            isRace={isRace}
            description="Update car"
            placeholder="Please, select a car"
            color={updateCarData.color}
            name={updateCarData.name}
            onAction={handleUpdateCar}
            onChange={handleUpdateChange}
            disabledInput={disabledInput}
          />
          <button disabled={isRace} type="button" onClick={handleGenerate}>
            GENERATE 100 cars
          </button>
          <button disabled={isSingleDriving()} type="button" onClick={handleRace}>
            race
          </button>
          <button disabled={isResetActive} type="button" onClick={handleRecet}>
            recet
          </button>
          {cars.length ? (
            <div>
              Garage: {carsLength}
              <Pagination
                disabled={isSingleDriving()}
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
                isDriving={isKekwing}
                isRace={isRace}
              />
            </div>
          ) : (
            <h1>OOPS, it`&apos;s empty</h1>
          )}
        </div>
        <div className={isHome ? styles.hidden : ''}>
          <h2>Winners</h2>
          {winners.length ? (
            <>
              <WinnersTable winners={winners} findOption={findWinnerCar} onSort={handleSort} />
              {/* {winners.map((i) => (
                <div key={i.id} style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <p>{findWinnerCar('color', i.id)}</p>
                  <p>{findWinnerCar('name', i.id)}</p>
                  <p>{i.wins}</p>
                  <p>{i.time}</p>
                </div>
              ))} */}
              <Pagination
                disabled={false}
                currentPage={currentWinnersPage}
                itemsCount={winnersLength}
                onPageChange={handleWinnersPageChange}
                pageSize={Constants.winnersLimit}
              />
            </>
          ) : (
            <h3>its empty</h3>
          )}
        </div>
      </>
    );
  }
  return <h1>Loading...</h1>;
}

export default HomePage;
