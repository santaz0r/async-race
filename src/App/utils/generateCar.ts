import createRandomCarName from './generateRandomCarName';
import createRandomColor from './generateRandomColor';

const generateCar = () => {
  const name = createRandomCarName();
  const color = createRandomColor();
  return { name, color };
};
export default generateCar;
