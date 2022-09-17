import { isValidObjectId } from 'mongoose';
import IService from '../interfaces/IService';
import { ICar, carZodSchema } from '../interfaces/ICar';
import { vehicleZodSchema } from '../interfaces/IVehicle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

export default class CarService implements IService<ICar> {
  private _car: IModel<ICar>;
  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  async create(obj: ICar): Promise<ICar> {
    const car = { doorsQty: obj.doorsQty, seatsQty: obj.seatsQty };
    const testCar = carZodSchema.safeParse(car);
    if (!testCar.success) throw testCar.error;

    const vehicle = {
      model: obj.model,
      year: obj.year,
      color: obj.color,
      buyValue: obj.buyValue,
      status: obj.status,
    };
    const testVehicle = vehicleZodSchema.safeParse(vehicle);
    if (!testVehicle.success) throw testVehicle.error;

    return this._car.create(obj);
  }

  async readOne(_id: string): Promise<ICar> {
    const car = await this._car.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  async read(): Promise<ICar[]> {
    const cars = await this._car.read();
    return cars;
  }

  async update(_id: string, obj: ICar): Promise<ICar | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);

    const parseCar = { doorsQty: obj.doorsQty, seatsQty: obj.seatsQty };
    const testCar = carZodSchema.safeParse(parseCar);
    if (!testCar.success) throw testCar.error;

    const vehicle = {
      model: obj.model,
      year: obj.year,
      color: obj.color,
      buyValue: obj.buyValue,
      status: obj.status,
    };

    const testVehicle = vehicleZodSchema.safeParse(vehicle);
    if (!testVehicle.success) throw testVehicle.error;

    const car = await this._car.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);

    return this._car.update(_id, obj);
  }

  async delete(_id: string): Promise<ICar> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);

    const car = await this._car.delete(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);

    return car;
  }
}