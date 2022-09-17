import { isValidObjectId } from 'mongoose';
import IService from '../interfaces/IService';
import { IMotorcycle, motoZodSchema } from '../interfaces/IMotorcycle';
import { vehicleZodSchema } from '../interfaces/IVehicle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

export default class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycle: IModel<IMotorcycle>;
  constructor(model: IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const motorcycle = { category: obj.category, engineCapacity: obj.engineCapacity };
    const testMoto = motoZodSchema.safeParse(motorcycle);
    if (!testMoto.success) throw testMoto.error;

    const vehicle = {
      model: obj.model,
      year: obj.year,
      color: obj.color,
      buyValue: obj.buyValue,
      status: obj.status,
    };
    const testVehicle = vehicleZodSchema.safeParse(vehicle);
    if (!testVehicle.success) throw testVehicle.error;

    return this._motorcycle.create(obj);
  }

  async readOne(_id: string): Promise<IMotorcycle> {
    const motorcycle = await this._motorcycle.readOne(_id);
    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);
    return motorcycle;
  }

  async read(): Promise<IMotorcycle[]> {
    const motorcycles = await this._motorcycle.read();
    return motorcycles;
  }

  async update(_id: string, obj: IMotorcycle): Promise<IMotorcycle | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);

    const parsemotorcycle = { category: obj.category, engineCapacity: obj.engineCapacity };
    const testmotorcycle = motoZodSchema.safeParse(parsemotorcycle);
    if (!testmotorcycle.success) throw testmotorcycle.error;

    const vehicle = {
      model: obj.model,
      year: obj.year,
      color: obj.color,
      buyValue: obj.buyValue,
      status: obj.status,
    };

    const testVehicle = vehicleZodSchema.safeParse(vehicle);
    if (!testVehicle.success) throw testVehicle.error;

    const motorcycle = await this._motorcycle.readOne(_id);
    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);

    return this._motorcycle.update(_id, obj);
  }

  async delete(_id: string): Promise<IMotorcycle> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);

    const motorcycle = await this._motorcycle.delete(_id);
    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);

    return motorcycle;
  }
}