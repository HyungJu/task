import { Body, Controller, Post } from '@nestjs/common';
import { CreateCurrency } from './services/create-currency';
import { CreateCurrencyInputDto } from './dtos/create-currency';

@Controller('currency')
export class CurrencyController {
  constructor(private service: CreateCurrency) {}

  @Post('')
  public test(@Body() dto: CreateCurrencyInputDto) {
    return this.service.execute(dto);
  }
}
