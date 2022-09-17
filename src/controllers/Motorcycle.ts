import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) {}

  async create(req: Request, res: Response<IMotorcycle>) {
    try {
      const { model, year, color, status, buyValue, category, engineCapacity } = req.body;
      const motorcycle = { model, year, color, status, buyValue, category, engineCapacity };
      const results = await this._service.create(motorcycle);
      return res.status(201).json(results);
    } catch (err) {
      if (err) return res.status(400).end();
    }
  }

  async read(req: Request, res: Response<IMotorcycle[]>) {
    try {
      const results = await this._service.read();
      return res.status(200).json(results);
    } catch (err) {
      if (err) return res.status(400).end();
    }
  }

  async readOne(req: Request, res: Response<IMotorcycle>) {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result);
  }

  async update(req: Request, res: Response<IMotorcycle | null>) {
    const result = await this._service.update(req.params.id, req.body);
    return res.status(200).json(result);
  }

  async delete(req: Request, res: Response<IMotorcycle>) {
    await this._service.delete(req.params.id);
    return res.status(204).json();
  }
}