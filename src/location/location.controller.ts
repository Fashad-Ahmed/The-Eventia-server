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
  async createLocation(
    @Body('name') name: string,
    @Body('price') price: string,
    @Body('cId') cId: string,
  ): Promise<any> {
    const newLocation = await this.locationService.create(name, price, cId);
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

  @Delete('/delete')
  async delete(@Body('id') id): Promise<any> {
    return await this.locationService.delete(id);
  }
}
