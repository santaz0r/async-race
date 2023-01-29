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

type EngineStatus = {
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

enum Constants {
  startLength = 0,
  startPage = 1,
  pageSize = 7,
  limitToGenerate = 100,
  winnersLimit = 10,
}
export { CarNames, CarModels, Constants };
export type { TCar, EngineStatus, TRespWinner };
