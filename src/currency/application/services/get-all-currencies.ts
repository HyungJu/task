import { Injectable } from '@nestjs/common';
import { Currency } from '../../domain/models/currency.model';
import { CurrencyRepositoryImpl } from '../../infrastructure/repository/currency.repository';

@Injectable()
export class GetAllCurrencies {
  constructor(private currencyRepository: CurrencyRepositoryImpl) {}

  public async execute(): Promise<Currency[]> {
    return this.currencyRepository.findAll();
  }
}
