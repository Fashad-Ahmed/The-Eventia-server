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
import { Payment } from './payment.model';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/createPayment')
  async createPayment(
    @Body('amount') amount: string,
    @Body('paymentMethod') paymentMethod: string,
    @Body('items') items: string,
    @Body('userId') userId: string,
  ): Promise<any> {
    const newPayment = await this.paymentService.create(
      amount,
      paymentMethod,
      items,
      userId,
    );
    return {
      newPayment,
    };
  }

  @Get('/fetchPayment')
  async fetchPayment(): Promise<any> {
    return await this.paymentService.fetchAll();
  }

  @Put('/:id')
  async update(@Res() response: Request, @Param('id') id): Promise<any> {
    const newPayment = await this.paymentService.update(response, id);
    return {
      newPayment,
    };
  }

  @Delete('/delete')
  async delete(@Body('id') id): Promise<any> {
    return await this.paymentService.delete(id);
  }

  @Get('/:id')
  async getPayment(@Res() response, @Param('id') id) {
    const payment = await this.paymentService.getUserPayment(id);
    return response.status(HttpStatus.OK).json({
      payment,
    });
  }
}
