import { TCar } from '../../types/types';
import { ReactComponent as CarLogo } from '../../assets/car-2901.svg';
import styles from './CarsList.module.scss';

type TProps = {
  cars: TCar[];
  handleClick: (car: TCar) => void;
  onDelete: (id: number) => void;
};

function CarsList({ cars, handleClick, onDelete }: TProps) {
  return (
    <div>
      {cars.map((car) => (
        <div key={car.id}>
          <div className="buttons">
            <button type="button" onClick={() => handleClick(car)}>
              Select
            </button>
            <button type="button" onClick={() => onDelete(car.id as number)}>
              REMOVE
            </button>
          </div>
          <p>{car.name}</p>

          <CarLogo
            className={styles.logo}
            style={{ transform: 'translate(0px)' }}
            fill={car.color}
            width="75px"
            height="75px"
          />
        </div>
      ))}
    </div>
  );
}

export default CarsList;
