import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vendor } from './vendor.model';
import { Admin } from '../admin/admin.model';

@Injectable()
export class VendorService {
  vendors: Vendor[] = [];
  constructor(
    @InjectModel('Vendor') private readonly vendorModel: Model<Vendor>,
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
  ) {}

  async create(name, description, phoneNumber, cId): Promise<any> {
    console.log('vendor create request started');
    try {
      const newVendor = await new this.vendorModel({
        name,
        description,
        phoneNumber,
        cId,
      });

      const vendor = await this.vendorModel.create(newVendor);
      return { ...vendor, statusCode: 200 };
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async fetchAll(): Promise<any> {
    console.log('vendor get request started');

    try {
      const getVendor = await this.vendorModel.find();
      if (!getVendor) {
        console.log(`no vendor found!`);
      }
      return getVendor;
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async update(req, id): Promise<any> {
    console.log('req', req);
    console.log('id', id);

    try {
      const newVendor = await new this.vendorModel({
        name: req.name,
        description: req.description,
        phoneNumber: req.phoneNumber,
        cId: req.cId,
      });

      const vendor = await this.vendorModel.findByIdAndUpdate(id, newVendor);
      return { ...vendor, statusCode: 200 };
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async delete(id): Promise<any> {
    console.log('id', id);

    try {
      const vendor = await this.vendorModel.findByIdAndDelete(id);
      return { ...vendor, statusCode: 200 };
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }
}
