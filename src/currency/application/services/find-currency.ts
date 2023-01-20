import { Injectable } from '@nestjs/common';

import { Currency } from '../../domain/models/currency.model';
import { CurrencyRepositoryImpl } from '../../infrastructure/repository/currency.repository';

@Injectable()
export class FindCurrency {
  constructor(private currencyRepository: CurrencyRepositoryImpl) {}

  public async execute(code: string): Promise<Currency | null> {
    return this.currencyRepository.findByCode(code);
  }
}
