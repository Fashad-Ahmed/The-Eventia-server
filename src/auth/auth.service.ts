import {
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './auth.model';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  products: Auth[] = [];
  constructor(@InjectModel('Auth') private readonly authModel: Model<Auth>) {}

  async fetchAll(): Promise<any> {
    try {
      const products = await this.authModel.find();
      return products;
    } catch (error) {
      console.log('error', error);
      throw [404, 'something went wrong'];
    }
  }

  async signin(email: any, password: any, admin: any): Promise<any> {
    try {
      console.log('signin', email, password, admin);
      const user = await this.authModel.findOne({ email: email });
      console.log('user', user);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      console.log('passwordIsValid', passwordIsValid);
      if (!passwordIsValid) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Invalid Password!',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      return !passwordIsValid ? HttpStatus.BAD_REQUEST : user;
    } catch (error) {
      console.log('error', error);
      throw [404, 'something went wrong'];
    }
  }

  async saveUser(
    userName: any,
    email: any,
    password: any,
    admin: any,
  ): Promise<any> {
    try {
      console.log('save admin new user', userName, email, password);
      const uniqueMail = await this.authModel.findOne({ email: email });
      console.log(uniqueMail);
      if (!uniqueMail) {
        console.log('save admin new user', userName, email, password);

        const bcryptPass = bcrypt.hashSync(password, 8);
        console.log('bcrypt pass', bcryptPass);

        const newAdminUser = new this.authModel({
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

  async delete(id: any): Promise<any> {
    try {
      console.log('delete', id);
      const result = await this.authModel.deleteOne({ _id: id });
      return result;
    } catch (error) {
      console.log('error', error);
      throw [404, 'something went wrong'];
    }
  }
}
