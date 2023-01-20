import { Injectable } from '@nestjs/common';
import { CurrencyRepository } from '../repository/currency.repository';
import { Currency } from '../models/currency.model';

@Injectable()
export class GetAllCurrencies {
  constructor(private currencyRepository: CurrencyRepository) {}

  public async execute(): Promise<Currency[]> {
    return this.currencyRepository.findAll();
  }
}
