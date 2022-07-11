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
import { Vendor } from './vendor.model';
import { VendorService } from './vendor.service';
import { Request, response } from 'express';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post('/createVendor')
  async createVendor(@Res() response: Request): Promise<any> {
    const newVendor = await this.vendorService.create(response.body);
    return {
      newVendor,
    };
  }

  @Get('/fetchVendor')
  async fetchVendor(@Res() response): Promise<any> {
    const vendors = await this.vendorService.fetchAll();
    return {
      vendors,
    };
  }

  @Put('/:id')
  async update(@Res() response: Request, @Param('id') id): Promise<any> {
    const newVendor = await this.vendorService.update(response, id);
    return {
      newVendor,
    };
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedVendor = await this.vendorService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedVendor,
    });
  }
}
