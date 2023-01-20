import { Injectable } from '@nestjs/common';

import { Currency } from '../../domain/models/currency.model';
import { CurrencyRepositoryImpl } from '../../infrastructure/repository/currency.repository';
import { ApplicationService } from '../../../core/application-service';

@Injectable()
export class FindCurrency
  implements ApplicationService<string, Currency | null>
{
  constructor(private currencyRepository: CurrencyRepositoryImpl) {}

  public async execute(code: string): Promise<Currency | null> {
    return this.currencyRepository.findByCode(code);
  }
}
