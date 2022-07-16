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

  // @Post('/createAdmin')
  // async createAdmin(
  //   @Res() response,
  //   @Body('createdAt') createdAt: Date,
  // ): Promise<any> {
  //   const newAdmin = await this.adminService.create(response.body);
  //   return response.status(HttpStatus.CREATED).json({
  //     newAdmin,
  //   });
  // }

  @Post('/signin')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('admin') admin: boolean,
  ): Promise<any> {
    try {
      const res = await this.adminService.signin(email, password, admin);
      return res;
    } catch (error) {
      return error;
    }
  }

  @Post('/signup')
  async saveUser(
    @Body('userName') userName: any,
    @Body('email') email: any,
    @Body('password') password: any,
    @Body('admin') admin: any,
  ): Promise<any> {
    return await this.adminService.saveUser(userName, email, password, admin);
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

  @Delete('/delete')
  async delete(@Body('id') id): Promise<any> {
    return await this.adminService.delete(id);
  }
}
