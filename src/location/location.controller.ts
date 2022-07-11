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
import { Request, response } from 'express';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('/createLocation')
  async createLocation(@Res() response: Request): Promise<any> {
    const newLocation = await this.locationService.create(response.body);
    return {
      newLocation,
    };
  }

  @Get('/fetchLocation')
  async fetchLocation(@Res() response): Promise<any> {
    const locations = await this.locationService.fetchAll();
    return {
      locations,
    };
  }

  @Put('/:id')
  async update(@Res() response: Request, @Param('id') id): Promise<any> {
    const newLocation = await this.locationService.update(response, id);
    return {
      newLocation,
    };
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedLocation = await this.locationService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedLocation,
    });
  }
}
