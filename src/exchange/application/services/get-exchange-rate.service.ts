import { ApplicationService } from '@core/application-service';
import { Injectable } from '@nestjs/common';
import { ExchangeRate } from '../../domain/models/exchange.model';
import { ExchangeRepositoryImpl } from '../../infrastructure/repository/exchange.repository';
import { GetExchangeRateCommand } from '@exchange/application/commands/get-exchange-rate.command';
import { ReferenceDate } from '@exchange/domain/models/reference-date.model';
import { GetCurrency } from '@currency/application/services/get-currency';

@Injectable()
export class GetExchangeRate
  implements ApplicationService<GetExchangeRateCommand, ExchangeRate>
{
  constructor(
    private exchangeRepository: ExchangeRepositoryImpl,
    private getCurrency: GetCurrency,
  ) {}

  public async execute(command: GetExchangeRateCommand): Promise<ExchangeRate> {
    const from = await this.getCurrency.execute(command.from);
    const to = await this.getCurrency.execute(command.to);

    const date = command.date
      ? ReferenceDate.fromString(command.date)
      : undefined;

    if (from.isEqual(to))
      return new ExchangeRate(from, to, 1, date ?? ReferenceDate.now());

    return this.exchangeRepository.get(from, to, date);
  }
}
