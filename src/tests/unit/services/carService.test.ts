import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { carMock, carMockWithId, carMockChangeWithId, carMockChange } from '../../mocks/carMock';

describe("car Service", () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).resolves(carMockWithId)
    sinon.stub(carModel, 'read').resolves([carMockWithId]);
    sinon.stub(carModel, 'update').resolves(carMockChangeWithId);
    sinon.stub(carModel, 'delete')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
  })
  

  after(() => {
    sinon.restore()
  })

  describe('Create car', () => {
    it('Success', async () => {
      const carCreated = await carService.create(carMock);
      expect(carCreated).to.be.deep.equal(carMockWithId);
    });
  });

  describe('ReadOne car', () => {
    it('Success', async () => {
      const carCreated = await carService.readOne(carMockWithId._id);
      expect(carCreated).to.be.deep.equal(carMockWithId);
    })

    it('Failure', async () => {
      let error;
      try {
        await carService.readOne(carMockWithId._id);
      } catch (err:any) {
        error = err
      }
      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    })
  });

  describe('Read car', () => {
    it('Success', async () => {
      const carsResult = await carService.read()
      expect(carsResult).to.be.deep.equal([carMockWithId])
    });
  });

  describe('Update car', () => {
    it('Success', async () => {
      const carsResult = await carService.update(carMockWithId._id, carMockChange)
      expect(carsResult).to.be.deep.equal(carMockChangeWithId)
    });
  });

  describe('Delete car', () => {
    it('Success', async () => {
      const carsResult = await carService.delete(carMockWithId._id)
      expect(carsResult).to.be.deep.equal(carMockWithId)
    });

    it('Failure', async () => {
      let error;
      try {
        await carService.delete(carMockWithId._id);
      } catch (err:any) {
        error = err
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    })
  });

})