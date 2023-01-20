import { Injectable } from '@nestjs/common';
import { Currency } from '../../domain/models/currency.model';
import { CurrencyRepositoryImpl } from '../../infrastructure/repository/currency.repository';
import { ApplicationService } from '@core/application-service';

@Injectable()
export class GetAllCurrencies implements ApplicationService<void, Currency[]> {
  constructor(private currencyRepository: CurrencyRepositoryImpl) {}

  public async execute(): Promise<Currency[]> {
    return this.currencyRepository.findAll();
  }
}
