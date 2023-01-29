import { TCar, EngineStatus } from '../../types/types';
import { ReactComponent as CarLogo } from '../../assets/car-2901.svg';
import { ReactComponent as FinishFlag } from '../../assets/finish.svg';
import styles from './CarsList.module.scss';

type TProps = {
  cars: TCar[];
  enginesData: EngineStatus;
  handleClick: (car: TCar) => void;
  onDelete: (id: number) => void;
  onStart: (id: number, status: 'started') => void;
  onStopped: (id: number, status: 'stopped') => void;
  isDriving: (id: number) => boolean;
  isRace: boolean;
};

function CarsList({ cars, enginesData, handleClick, onDelete, onStart, onStopped, isDriving, isRace }: TProps) {
  const addClass = (id: number): string =>
    enginesData[id].velocity > 0 && enginesData[id].status !== 'broken'
      ? styles.car_drive
      : enginesData[id].velocity === 0 && enginesData[id].status !== 'broken'
      ? styles.car_stopped
      : styles.car_broken;

  return (
    <div>
      {cars.map((car) => (
        <div key={car.id} className={styles.car_item}>
          <div className={styles.car_name}>
            <h3>{car.name}</h3>
          </div>
          <div className={styles.car_controls}>
            <button
              className={styles.car_controls_btn}
              disabled={isRace || isDriving(car.id!)}
              type="button"
              onClick={() => handleClick(car)}
            >
              Edit
            </button>
            <button
              className={styles.car_controls_btn}
              disabled={isRace || isDriving(car.id!)}
              type="button"
              onClick={() => onDelete(car.id as number)}
            >
              Delete
            </button>
          </div>

          <div className={styles.car_track}>
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
            <FinishFlag className={styles.car_finish} width="50px" height="50px" />
          </div>

          <div className={styles.engine_constrols}>
            <button
              className={styles.engine_constrols_btn}
              disabled={isRace || isDriving(car.id!)}
              type="button"
              onClick={() => onStart(car.id as number, 'started')}
            >
              start
            </button>
            <button
              className={styles.engine_constrols_btn}
              disabled={isRace || !isDriving(car.id!)}
              type="button"
              onClick={() => onStopped(car.id as number, 'stopped')}
            >
              stop
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CarsList;
