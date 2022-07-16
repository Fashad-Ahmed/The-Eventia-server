import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('admin') admin: boolean,
  ): Promise<any> {
    try {
      const res = await this.authService.signin(email, password, admin);
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
    return await this.authService.saveUser(userName, email, password, admin);
  }

  @Get('/fetchAll')
  async fetchAll(): Promise<any> {
    return await this.authService.fetchAll();
  }

  @Delete('/:id')
  async delete(@Param('id') id): Promise<any> {
    return await this.authService.delete(id);
  }
}
