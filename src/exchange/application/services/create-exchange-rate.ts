import { ApplicationService } from '../../../core/application-service';
import { Injectable } from '@nestjs/common';
import { ExchangeRate } from '../../domain/models/exchange.model';
import { ExchangeRepositoryImpl } from '../../infrastructure/repository/exchange.repository';
import { FindCurrency } from '../../../currency/application/services/find-currency';
import { CurrencyNotFouncException } from '@exchange/domain/exceptions/CurrencyNotFouncException';
import { CreateExchangeRateInput } from '@exchange/application/dtos/create-exchange-rate.dto';
import { ReferenceDate } from '@exchange/domain/models/reference-date.model';

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

    const referenceDate = dto.date
      ? ReferenceDate.fromString(dto.date)
      : new ReferenceDate(new Date());

    const exchangeRate = new ExchangeRate(from, to, dto.rate, referenceDate);

    return this.exchangeRepository.create(exchangeRate);
  }
}
