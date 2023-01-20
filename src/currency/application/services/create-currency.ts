import { Injectable } from '@nestjs/common';
import { Currency } from '../../domain/models/currency.model';
import { CurrencyRepositoryImpl } from '../../infrastructure/repository/currency.repository';
import { DuplicateCurrencyCodeException } from '../../domain/exceptions/DuplicateCurrencyCodeException';

export class CreateCurrencyInputDto {
  code!: string;
  name!: string;
}

@Injectable()
export class CreateCurrency {
  constructor(private currencyRepository: CurrencyRepositoryImpl) {}

  public async execute(dto: CreateCurrencyInputDto) {
    const currencyExists = await this.currencyRepository.findByCode(dto.code);
    if (currencyExists) throw new DuplicateCurrencyCodeException();

    const currency = new Currency(dto.code, dto.name);
    await this.currencyRepository.insert(currency);

    return currency;
  }
}
