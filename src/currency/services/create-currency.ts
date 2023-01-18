import { Injectable } from '@nestjs/common';
import { CurrencyRepository } from '../repository/currency.repository';
import { CreateCurrencyInputDto } from '../dtos/create-currency';
import { Currency } from '../models/currency.model';

@Injectable()
export class CreateCurrency {
  constructor(private currencyRepository: CurrencyRepository) {}

  public async execute(dto: CreateCurrencyInputDto) {
    const currency = new Currency(dto.code, dto.name);
    await this.currencyRepository.insert(currency);

    return currency;
  }
}
