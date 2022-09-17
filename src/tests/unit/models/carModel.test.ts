import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/Car';
import { Model } from 'mongoose';
import { carMock, carMockWithId, carMockChange } from '../../mocks/carMock';
import { ICar } from '../../../interfaces/ICar';

describe('Car Model', () => {
  const carModel = new CarModel();
  const carList = [carModel,
    {
    _id: '63237f557eb843e79d6a38a5',
    doorsQty: 4,
    seatsQty: 4,
    model: "Chevet",
    year: 1980,
    color: "Azul",
    buyValue: 9000
    }
  ];

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves(carList);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carList[1]);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carList[1]);
  });

  after(() => {
    sinon.restore();
  });

  describe('creating a Car', () => {
    it('successfuly created', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  });

  describe('searching a Car', () => {
    it('successfuly found', async () => {
      const CarFound = await carModel.readOne(carMockWithId._id);
      expect(CarFound).to.be.deep.equal(carMockWithId);
    });

    it('_id not found', async () => {
      try {
        await carModel.readOne('123errado');
      } catch(error: any) {
          expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });

  describe('searching all Cars', () => {
    it('successfuly found all Cars', async () => {
      const CarsFound = await carModel.read();
      expect(CarsFound).to.be.an('array');
      expect(CarsFound).to.be.deep.equal(carList);
      CarsFound?.forEach((Car: ICar, index: number) => {
        expect(Car).to.be.deep.equal(carList[index]);
      })
    });
  });

  describe('changing a Cars', () => {
    it('successfuly changed', async () => {
      const carChange = await carModel.update(carMockWithId._id, carMockChange);
      expect(carChange).to.be.deep.equal(carList[1]);
      
    });
  });

  describe('delete a Car', () => {
    it('successfuly Car deleted', async () => {
      const deleteCar = await carModel.delete(carMockWithId._id);
      expect(deleteCar).to.be.deep.equal(carList[1]);
    });

    it('_id not found', async () => {
      try {
        await carModel.delete('123errado');
      } catch(error: any) {
          expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });

});