import { Injectable } from '@nestjs/common';
import { CurrencyRepository } from '../repository/currency.repository';
import { Currency } from '../models/currency.model';

@Injectable()
export class FindCurrency {
  constructor(private currencyRepository: CurrencyRepository) {}

  public async execute(code: string): Promise<Currency | null> {
    return this.currencyRepository.findByCode(code);
  }
}
