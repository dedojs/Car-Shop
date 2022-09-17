import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import MotorcycleModel from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/Motorcycle';
import { motorcycleMock, motorcycleMockWithId, motorcycleMockChange, motorcycleMockChangeWithId } from '../../mocks/motorcycleMock';

describe("motorcycle Service", () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);

  before(() => {
    sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleModel, 'readOne')
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).resolves(motorcycleMockWithId)
    sinon.stub(motorcycleModel, 'read').resolves([motorcycleMockWithId]);
    sinon.stub(motorcycleModel, 'update').resolves(motorcycleMockChangeWithId);
    sinon.stub(motorcycleModel, 'delete')
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).resolves(null);
  })
  

  after(() => {
    sinon.restore()
  })

  describe('Create motorcycle', () => {
    it('Success', async () => {
      const motorcycleCreated = await motorcycleService.create(motorcycleMock);
      expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
    });
  });

  describe('ReadOne motorcycle', () => {
    it('Success', async () => {
      const motorcycleCreated = await motorcycleService.readOne(motorcycleMockWithId._id);
      expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
    })

    it('Failure', async () => {
      let error;
      try {
        await motorcycleService.readOne(motorcycleMockWithId._id);
      } catch (err:any) {
        error = err
      }
      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    })
  });

  describe('Read motorcycle', () => {
    it('Success', async () => {
      const motorcyclesResult = await motorcycleService.read()
      expect(motorcyclesResult).to.be.deep.equal([motorcycleMockWithId])
    });
  });

  describe('Update motorcycle', () => {
    it('Success', async () => {
      const motorcyclesResult = await motorcycleService.update(motorcycleMockWithId._id, motorcycleMockChange)
      expect(motorcyclesResult).to.be.deep.equal(motorcycleMockChangeWithId)
    });
  });

  describe('Delete motorcycle', () => {
    it('Success', async () => {
      const motorcyclesResult = await motorcycleService.delete(motorcycleMockWithId._id)
      expect(motorcyclesResult).to.be.deep.equal(motorcycleMockWithId)
    });

    it('Failure', async () => {
      let error;
      try {
        await motorcycleService.delete(motorcycleMockWithId._id);
      } catch (err:any) {
        error = err
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    })
  });

})