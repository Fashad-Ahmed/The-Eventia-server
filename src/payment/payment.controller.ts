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
  async createPayment(@Res() response: Request): Promise<any> {
    const newPayment = await this.paymentService.create(response.body);
    return {
      newPayment,
    };
  }

  @Get('/fetchPayment')
  async fetchPayment(@Res() response): Promise<any> {
    const payments = await this.paymentService.fetchAll();
    return {
      payments,
    };
  }

  @Put('/:id')
  async update(@Res() response: Request, @Param('id') id): Promise<any> {
    const newPayment = await this.paymentService.update(response, id);
    return {
      newPayment,
    };
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedPayment = await this.paymentService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedPayment,
    });
  }

  @Get('/:id')
  async getPayment(@Res() response, @Param('id') id) {
    const payment = await this.paymentService.getUserPayment(id);
    return response.status(HttpStatus.OK).json({
      payment,
    });
  }
}
