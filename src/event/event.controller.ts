import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Date } from 'mongoose';
import { Event } from './event.model';
import { EventService } from './event.service';
import { Request, response } from 'express';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/createEvent')
  async createEvent(@Res() response: Request): Promise<any> {
    const newEvent = await this.eventService.create(response.body);
    return {
      newEvent,
    };
  }

  @Get('/fetchEvent')
  async fetchEvent(@Res() response): Promise<any> {
    const admins = await this.eventService.fetchAll();
    return {
      admins,
    };
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id): Promise<any> {
    const newEvent = await this.eventService.update(response, id);
    return {
      newEvent,
    };
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedAdmin = await this.eventService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedAdmin,
    });
  }
}
