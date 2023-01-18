import { TCar, engineStatus } from '../../types/types';
import { ReactComponent as CarLogo } from '../../assets/car-2901.svg';
import styles from './CarsList.module.scss';

type TProps = {
  cars: TCar[];
  enginesData: engineStatus;
  handleClick: (car: TCar) => void;
  onDelete: (id: number) => void;
  onStart: (id: number, status: 'started') => void;
  onStopped: (id: number, status: 'stopped') => void;
};

function CarsList({ cars, enginesData, handleClick, onDelete, onStart, onStopped }: TProps) {
  const addClass = (id: number) =>
    enginesData[id].velocity > 0 && enginesData[id].status !== 'broken'
      ? styles.car_drive
      : enginesData[id].velocity === 0 && enginesData[id].status !== 'broken'
      ? styles.car_stopped
      : styles.car_broken;

  return (
    <div>
      {cars.map((car) => (
        <div key={car.id} style={{ border: '1px solid black', marginBottom: '15px' }}>
          <div className="buttons">
            <button type="button" onClick={() => handleClick(car)}>
              Select
            </button>
            <button type="button" onClick={() => onDelete(car.id as number)}>
              REMOVE
            </button>
          </div>
          <p>{car.name}</p>
          <div className="engine_buttons">
            <button type="button" onClick={() => onStart(car.id as number, 'started')}>
              start
            </button>
            <button type="button" onClick={() => onStopped(car.id as number, 'stopped')}>
              stopped
            </button>
          </div>
          <div>
            <CarLogo
              className={enginesData[car.id!] ? `${addClass(car.id!)}` : ''}
              style={
                enginesData[car.id!]
                  ? { animationDuration: `${enginesData[car.id!].distance / 1000 / enginesData[car.id!].velocity}s` }
                  : {}
              }
              fill={car.color}
              width="75px"
              height="75px"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CarsList;
