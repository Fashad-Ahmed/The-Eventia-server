import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './admin.model';
import { Auth } from 'src/auth/auth.model';
@Injectable()
export class AdminService {
  products: Admin[] = [];
  constructor(
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
    @InjectModel('Auth') private readonly authModel: Model<Auth>,
  ) {}

  async create(req): Promise<any> {
    console.log('admin create request started', req);

    try {
      const newAdmin = await new this.adminModel({
        createdAt: req.createdAt,
        adminId: req.adminId,
      });

      const admin = await this.adminModel.create(newAdmin);
      return { ...admin, statusCode: 200 };
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async fetchAll(): Promise<any> {
    console.log('admin get request started');

    try {
      const getAdmin = await this.adminModel.find().exec();
      if (!getAdmin) {
        console.log(`no admin found!`);
      }
      return getAdmin;
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async readById(userId): Promise<any> {
    console.log('admin get request started');

    try {
      console.log('entered in try block');

      const findId = await this.adminModel.findById(userId);

      if (!findId) {
        console.log(`something went wrong`);
        throw [404];
      }
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async update(req, id, admin): Promise<any> {
    console.log('req', req);
    console.log('id', id);
    console.log('admin', admin);

    try {
      const newAdmin = await new this.adminModel({
        createdAt: req.createdAt,
        adminId: req.adminId,
      });

      const admin = await this.adminModel.findByIdAndUpdate(id, newAdmin, {
        new: true,
      });
      return { ...admin, statusCode: 200 };
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async delete(id): Promise<any> {
    console.log('id', id);

    try {
      return await this.adminModel.findByIdAndRemove(id);
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }
}
