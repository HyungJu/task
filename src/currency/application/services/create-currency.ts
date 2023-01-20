import { Injectable } from '@nestjs/common';
import { Currency } from '../../domain/models/currency.model';
import { CurrencyRepositoryImpl } from '../../infrastructure/repository/currency.repository';
import { DuplicateCurrencyCodeException } from '../../domain/exceptions/DuplicateCurrencyCodeException';
import { ApplicationService } from '../../../core/application-service';

export class CreateCurrencyInputDto {
  code!: string;
  name!: string;
}

@Injectable()
export class CreateCurrency
  implements ApplicationService<CreateCurrencyInputDto, Currency>
{
  constructor(private currencyRepository: CurrencyRepositoryImpl) {}

  public async execute(dto: CreateCurrencyInputDto): Promise<Currency> {
    const currencyExists = await this.currencyRepository.findByCode(dto.code);
    if (currencyExists) throw new DuplicateCurrencyCodeException();

    const currency = new Currency(null, dto.code, dto.name);
    return this.currencyRepository.insert(currency);
  }
}
