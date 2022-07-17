import {
  Body,
  Controller,
  Delete,
  Get,
  HostParam,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Date } from 'mongoose';
import { Request } from 'express';
import { Event } from './event.model';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/createEvent')
  async createEvent(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('location') location: string,
    @Body('price') price: number,
    @Body('category') category: string,
    @Body('userId') userId: string,
    @Body('adminId') adminId: string,
  ): Promise<any> {
    return await this.eventService.create(
      name,
      description,
      location,
      price,
      category,
      userId,
      adminId,
    );
  }

  @Get('/fetchEvent')
  async fetchEvent(@Res() response): Promise<any> {
    return await this.eventService.fetchAll();
  }

  @Put('/update')
  async update(@Res() response, @Param('id') id): Promise<any> {
    return await this.eventService.update(response, id);
  }

  @Delete('/delete')
  async delete(@Body('id') id): Promise<any> {
    return await this.eventService.delete(id);
  }

  @Get('/:id')
  async getEvent(@Res() response, @Param('id') id) {
    const event = await this.eventService.getById(id);
    return response.status(HttpStatus.OK).json({
      event,
    });
  }
}
