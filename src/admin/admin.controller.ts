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
import { response } from 'express';
import { Date } from 'mongoose';
import { Admin } from './admin.model';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/createAdmin')
  async createAdmin(
    @Res() response,
    @Body('createdAt') createdAt: Date,
  ): Promise<any> {
    const newAdmin = await this.adminService.create(response.body);
    return response.status(HttpStatus.CREATED).json({
      newAdmin,
    });
  }

  @Get('/fetchAdmin')
  async fetchAdmin(@Res() response): Promise<any> {
    const admins = await this.adminService.fetchAll();
    return response.status(HttpStatus.OK).json({
      admins,
    });
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id): Promise<any> {
    const admin = await this.adminService.readById(id);
    return response.status(HttpStatus.OK).json({
      admin,
    });
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id): Promise<any> {
    const updatedAdmin = await this.adminService.update(response, id);
    return response.status(HttpStatus.OK).json({
      updatedAdmin,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedAdmin = await this.adminService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedAdmin,
    });
  }
}
