import { IMotorcycle } from "../../interfaces/IMotorcycle";

const motorcycleMock:IMotorcycle = {
  category: 'Street',
  engineCapacity: 1000,
  model: "Ninja",
  year: 2000,
  color: "Verde",
  buyValue: 15000
}

const motorcycleMockWithId: IMotorcycle & { _id:string } = {
  _id: '632378587eb843e79d6a389e',
  category: 'Street',
  engineCapacity: 1000,
  model: "Ninja",
  year: 2000,
  color: "Verde",
  buyValue: 15000
}

const motorcycleMockChange:IMotorcycle = {
  category: 'Street',
  engineCapacity: 1200,
  model: "Harley",
  year: 2001,
  color: "Black",
  buyValue: 9000
}

const motorcycleMockChangeWithId:IMotorcycle & { _id:string } = {
  _id: '632378587eb843e79d6a389e',
  category: 'Street',
  engineCapacity: 1200,
  model: "Harley",
  year: 2001,
  color: "Black",
  buyValue: 9000
}

export { motorcycleMock, motorcycleMockWithId, motorcycleMockChange, motorcycleMockChangeWithId }