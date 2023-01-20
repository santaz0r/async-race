type TCar = {
  name: string;
  color: string;
  id?: number;
};

type TRespWinner = {
  id: number;
  wins: number;
  time: number;
};

type engineStatus = {
  [id: number]: {
    status: string;
    velocity: number;
    distance: number;
  };
};

enum CarNames {
  Tesla,
  BMW,
  Jigyli,
  Lamborghini,
  Opel,
  Ford,
  Ferrari,
  OKA,
  Bugatti,
  Honda,
}

enum CarModels {
  Model_X,
  Model_S,
  Cayene,
  Cybertruck,
  Aventador,
  Mustang,
  Model_E,
  Rapid,
  Sedan,
  Octavia,
}
export { CarNames, CarModels };
export type { TCar, engineStatus, TRespWinner };
