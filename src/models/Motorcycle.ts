import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const MotorcycleMongooseSchema = new Schema<IMotorcycle>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

export default class Car extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('Motorcycle', MotorcycleMongooseSchema)) {
    super(model);
  }
}