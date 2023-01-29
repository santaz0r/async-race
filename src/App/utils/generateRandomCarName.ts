import { CarNames, CarModels } from '../types/types';
import randomNumber from './generateRandomNumber';

const createRandomCarName = () => {
  const lenName = Object.keys(CarNames).length / 2;
  const lenModel = Object.keys(CarModels).length / 2;
  const randName = randomNumber(0, lenName - 1);
  const randModel = randomNumber(0, lenModel - 1);
  return `${CarNames[randName]} ${CarModels[randModel].split('_').join(' ')}`;
};

export default createRandomCarName;
