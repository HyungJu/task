import { Injectable } from '@nestjs/common';

import { Currency } from '@currency/domain/models/currency.model';
import { CurrencyRepositoryImpl } from '@currency/infrastructure/repository/currency.repository';
import { ApplicationService } from '@core/application-service';
import { CurrencyNotFoundException } from '@currency/domain/exceptions/CurrencyNotFoundException';

@Injectable()
export class GetCurrency
  implements ApplicationService<string, Currency | null>
{
  constructor(private currencyRepository: CurrencyRepositoryImpl) {}

  public async execute(code: string): Promise<Currency> {
    const currency = await this.currencyRepository.findByCode(code);
    if (!currency) throw new CurrencyNotFoundException();
    return currency;
  }
}
