import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './admin.model';
const bcrypt = require('bcryptjs');

@Injectable()
export class AdminService {
  products: Admin[] = [];
  constructor(
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
  ) {}

  async signin(email: any, password: any, admin: any): Promise<any> {
    console.log('sign in');
    try {
      try {
        const userExist = await this.adminModel.findOne({ email: email });
        if (!userExist) {
          throw new NotFoundException('User does not exist');
        }

        console.log(bcrypt.compareSync(password, userExist.password));
        console.log(!bcrypt.compareSync(password, userExist.password));

        if (!bcrypt.compareSync(password, userExist.password)) {
          console.log('Wrong password');
          throw new NotFoundException('Wrong Password');
        }

        const user = {
          userExist,
        };
        console.log(user);
        return { ...user, statusCode: 200 };
      } catch (error) {
        throw [404, error.message];
      }
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  // async create(req): Promise<any> {
  //   console.log('admin create request started', req);

  //   const bcryptPass = bcrypt.hashSync(req.password, 8);
  //   console.log('bcrypt pass', bcryptPass, Date.now());
  //   try {
  //     const newAdmin = await new this.adminModel({
  //       createdAt: Date.now(),
  //       userName: req.userName,
  //       email: req.email,
  //       password: bcryptPass,
  //       adminStatus: true,
  //       phoneNumber: req.phoneNumber,
  //       age: req.age,
  //     });

  //     const admin = await this.adminModel.create(newAdmin);
  //     return { ...admin, statusCode: 200 };
  //   } catch (error) {
  //     console.log(error);
  //     throw [404, error.message];
  //   }
  // }

  async saveUser(
    userName: any,
    email: any,
    password: any,
    admin: any,
  ): Promise<any> {
    try {
      console.log('save admin new user', userName, email, password);
      const uniqueMail = await this.adminModel.findOne({ email: email });
      console.log(uniqueMail);
      if (!uniqueMail) {
        console.log('save admin new user', userName, email, password);

        const bcryptPass = bcrypt.hashSync(password, 8);
        console.log('bcrypt pass', bcryptPass);

        const newAdminUser = new this.adminModel({
          userName,
          email,
          password: bcryptPass,
          admin,
        });

        const result = await newAdminUser.save();
        console.log(result);
        return result;
      } else {
        throw new ConflictException('User already exist');
      }
    } catch (error) {
      console.log('error', error);
      throw [404, 'something went wrong'];
    }
  }
  async fetchAll(): Promise<any> {
    console.log('admin get request started');

    try {
      const getAdmin = await this.adminModel.find();
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

  async update(req, id): Promise<any> {
    console.log('req', req);
    console.log('id', id);
    // console.log('admin', admi);

    try {
      const newAdmin = await new this.adminModel({
        createdAt: Date.now(),
        userName: req.userName,
        email: req.email,
        password: req.password,
        adminStatus: true,
        phoneNumber: req.phoneNumber,
        age: req.age,
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
