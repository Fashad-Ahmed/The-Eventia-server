import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './event.model';
import { Auth } from '../auth/auth.model';

@Injectable()
export class EventService {
  products: Event[] = [];
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<Event>,
    @InjectModel('Auth') private readonly authModel: Model<Auth>,
  ) {}

  async create(req): Promise<any> {
    console.log('event create request started', req);
    try {
      const newEvent = await new this.eventModel({
        name: req.name,
        createdAt: Date.now(),
        description: req.description,
        category: req.category,
        price: req.price,
        userId: req.userId,
        adminId: req.adminId,
      });

      const event = await this.eventModel.create(newEvent);
      return { ...event, statusCode: 200 };
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async fetchAll(): Promise<any> {
    console.log('event get request started');

    try {
      const getEvent = await this.eventModel.find().exec();
      if (!getEvent) {
        console.log(`no event found!`);
      }
      return getEvent;
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async update(req, id): Promise<any> {
    console.log('req', req);
    console.log('id', id);

    try {
      const newEvent = await new this.eventModel({
        name: req.name,
        createdAt: Date.now(),
        description: req.description,
        category: req.category,
        price: req.price,
        userId: req.userId,
        adminId: req.adminId,
      });

      const event = await this.eventModel.findByIdAndUpdate(id, newEvent, {
        new: true,
      });
      return { ...event, statusCode: 200 };
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async delete(id): Promise<any> {
    console.log('id', id);

    try {
      return await this.eventModel.findByIdAndRemove(id);
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async getById(id): Promise<any> {
    console.log('id', id);

    try {
      return await this.eventModel.findById(id);
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }
}
