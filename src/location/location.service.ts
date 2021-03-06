import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from './location.model';
import { Admin } from '../admin/admin.model';

@Injectable()
export class LocationService {
  products: Location[] = [];
  constructor(
    @InjectModel('Location') private readonly locationModel: Model<Location>,
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
  ) {}

  async create(name, price, cId): Promise<any> {
    console.log('location create request started');
    try {
      const newLocation = await new this.locationModel({
        name,
        price,
        cId,
      });

      const location = await this.locationModel.create(newLocation);
      return { ...location, statusCode: 200 };
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async fetchAll(): Promise<any> {
    try {
      const getLocation = await this.locationModel.find();
      return getLocation;
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async update(req, id): Promise<any> {
    console.log('req', req);
    console.log('id', id);

    try {
      const newLocation = await new this.locationModel({
        name: req.name,
        price: req.price,
        cId: req.cId,
      });

      const location = await this.locationModel.findByIdAndUpdate(
        id,
        newLocation,
      );
      return { ...location, statusCode: 200 };
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async delete(id): Promise<any> {
    console.log('id', id);

    try {
      const location = await this.locationModel.findByIdAndDelete(id);
      return { ...location, statusCode: 200 };
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }
}
