import { ApplicationService } from '../../../core/application-service';
import { Injectable } from '@nestjs/common';
import { ExchangeRate } from '../../domain/models/exchange.model';
import { ExchangeRepositoryImpl } from '../../infrastructure/repository/exchange.repository';
import { FindCurrency } from '../../../currency/application/services/find-currency';
import { CurrencyNotFouncException } from '@exchange/domain/exceptions/CurrencyNotFouncException';
import { CreateExchangeRateInput } from '@exchange/application/dtos/create-exchange-rate.dto';

@Injectable()
export class CreateExchangeRate
  implements ApplicationService<CreateExchangeRateInput, ExchangeRate>
{
  constructor(
    private exchangeRepository: ExchangeRepositoryImpl,
    private findCurrency: FindCurrency,
  ) {}

  public async execute(dto: CreateExchangeRateInput): Promise<ExchangeRate> {
    const from = await this.findCurrency.execute(dto.from);
    const to = await this.findCurrency.execute(dto.to);

    if (!from || !to) throw new CurrencyNotFouncException();

    const exchangeRate = new ExchangeRate(from, to, dto.rate, dto.date);
    return this.exchangeRepository.create(exchangeRate);
  }
}
