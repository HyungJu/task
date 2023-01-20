import { Injectable } from '@nestjs/common';
import { Currency } from '../../domain/models/currency.model';
import { CurrencyRepositoryImpl } from '../../infrastructure/repository/currency.repository';
import { DuplicateCurrencyCodeException } from '../../domain/exceptions/DuplicateCurrencyCodeException';
import { ApplicationService } from '@core/application-service';
import { CreateCurrencyCommand } from '@currency/application/commands/create-currency.command';

@Injectable()
export class CreateCurrency
  implements ApplicationService<CreateCurrencyCommand, Currency>
{
  constructor(private currencyRepository: CurrencyRepositoryImpl) {}

  public async execute(dto: CreateCurrencyCommand): Promise<Currency> {
    const currencyExists = await this.currencyRepository.findByCode(dto.code);
    if (currencyExists) throw new DuplicateCurrencyCodeException();

    const currency = new Currency(undefined, dto.code, dto.name);
    return this.currencyRepository.insert(currency);
  }
}
