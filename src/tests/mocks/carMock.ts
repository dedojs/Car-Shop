import { ICar } from "../../interfaces/ICar";

const carMock:ICar = {
  doorsQty: 4,
  seatsQty: 4,
  model: "Fusca",
  year: 1980,
  color: "Azul",
  buyValue: 10000
}

const carMockChange:ICar = {
  doorsQty: 4,
  seatsQty: 4,
  model: "Chevet",
  year: 1980,
  color: "Azul",
  buyValue: 9000
}

const carMockChangeWithId:ICar & { _id:string } = {
  _id: '632378587eb843e79d6a389e',
  doorsQty: 4,
  seatsQty: 4,
  model: "Chevet",
  year: 1980,
  color: "Azul",
  buyValue: 9000
}

const carMockWithId: ICar & { _id:string } = {
  _id: '632378587eb843e79d6a389e',
  doorsQty: 4,
  seatsQty: 4,
  model: "Fusca",
  year: 1980,
  color: "Azul",
  buyValue: 10000
}

export { carMock, carMockWithId, carMockChange, carMockChangeWithId }