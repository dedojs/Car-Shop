import { expect } from 'chai';
import sinon from 'sinon';
import MotorcycleModel from '../../../models/Motorcycle';
import { Model } from 'mongoose';
import { motorcycleMock, motorcycleMockWithId, motorcycleMockChange } from '../../mocks/motorcycleMock';
import { IMotorcycle } from '../../../interfaces/IMotorcycle';

describe('motorcycle Model', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleList = [motorcycleModel, motorcycleMockWithId];

  before(() => {
    sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'findOne').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'find').resolves(motorcycleList);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleList[1]);
    sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycleList[1]);
  });

  after(() => {
    sinon.restore();
  });

  describe('creating a motorcycle', () => {
    it('successfuly created', async () => {
      const newmotorcycle = await motorcycleModel.create(motorcycleMock);
      expect(newmotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
  });

  describe('searching a motorcycle', () => {
    it('successfuly found', async () => {
      const motorcycleFound = await motorcycleModel.readOne(motorcycleMockWithId._id);
      expect(motorcycleFound).to.be.deep.equal(motorcycleMockWithId);
    });

    it('_id not found', async () => {
      try {
        await motorcycleModel.readOne('123errado');
      } catch(error: any) {
          expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });

  describe('searching all motorcycles', () => {
    it('successfuly found all motorcycles', async () => {
      const motorcyclesFound = await motorcycleModel.read();
      expect(motorcyclesFound).to.be.an('array');
      expect(motorcyclesFound).to.be.deep.equal(motorcycleList);
      motorcyclesFound?.forEach((motorcycle: IMotorcycle, index: number) => {
        expect(motorcycle).to.be.deep.equal(motorcycleList[index]);
      })
    });
  });

  describe('changing a motorcycles', () => {
    it('successfuly changed', async () => {
      const motorcycleChange = await motorcycleModel.update(motorcycleMockWithId._id, motorcycleMockChange);
      expect(motorcycleChange).to.be.deep.equal(motorcycleList[1]);
      
    });
  });

  describe('delete a motorcycle', () => {
    it('successfuly motorcycle deleted', async () => {
      const deletemotorcycle = await motorcycleModel.delete(motorcycleMockWithId._id);
      expect(deletemotorcycle).to.be.deep.equal(motorcycleList[1]);
    });

    it('_id not found', async () => {
      try {
        await motorcycleModel.delete('123errado');
      } catch(error: any) {
          expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });

});