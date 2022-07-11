import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from './payment.model';
import { Auth } from '../auth/auth.model';

@Injectable()
export class PaymentService {
  products: Payment[] = [];
  constructor(
    @InjectModel('Payment') private readonly paymentModel: Model<Payment>,
    @InjectModel('Auth') private readonly authModel: Model<Auth>,
  ) {}

  async create(req): Promise<any> {
    console.log('payment create request started', req);
    try {
      const newPayment = await new this.paymentModel({
        createdAt: Date.now(),
        amount: req.amount,
        paymentMethod: req.paymentMethod,
        items: req.items,
        userId: req.userId,
      });

      const payment = await this.paymentModel.create(newPayment);
      return { ...payment, statusCode: 200 };
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async fetchAll(): Promise<any> {
    console.log('payment get request started');

    try {
      const getPayment = await this.paymentModel.find().exec();
      if (!getPayment) {
        console.log(`no payment found!`);
      }
      return getPayment;
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async update(req, id): Promise<any> {
    console.log('req', req);
    console.log('id', id);

    try {
      const newPayment = await new this.paymentModel({
        createdAt: Date.now(),
        amount: req.amount,
        paymentMethod: req.paymentMethod,
        items: req.items,
        userId: req.userId,
      });

      const payment = await this.paymentModel.create(newPayment);
      return { ...payment, statusCode: 200 };
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async delete(id): Promise<any> {
    console.log('id', id);

    try {
      const payment = await this.paymentModel.findByIdAndDelete(id);
      return { ...payment, statusCode: 200 };
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async getUserPayment(userId): Promise<any> {
    console.log('userId', userId);

    try {
      const payment = await this.paymentModel.find({ userId });
      return { ...payment, statusCode: 200 };
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }
}
