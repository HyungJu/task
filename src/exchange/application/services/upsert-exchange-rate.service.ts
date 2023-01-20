import { ApplicationService } from '@core/application-service';
import { Injectable } from '@nestjs/common';
import { ExchangeRate } from '../../domain/models/exchange.model';
import { ExchangeRepositoryImpl } from '../../infrastructure/repository/exchange.repository';
import { UpsertExchangeRateCommand } from '@exchange/application/commands/create-exchange-rate.command';
import { ReferenceDate } from '@exchange/domain/models/reference-date.model';
import { GetExchangeRate } from '@exchange/application/services/get-exchange-rate.service';
import { GetCurrency } from '@currency/application/services/get-currency';

@Injectable()
export class UpsertExchangeRate
  implements ApplicationService<UpsertExchangeRateCommand, ExchangeRate>
{
  constructor(
    private exchangeRepository: ExchangeRepositoryImpl,
    private getCurrency: GetCurrency,
    private getExchangeRate: GetExchangeRate,
  ) {}

  public async execute(
    command: UpsertExchangeRateCommand,
  ): Promise<ExchangeRate> {
    const from = await this.getCurrency.execute(command.from);
    const to = await this.getCurrency.execute(command.to);

    if (from.isEqual(to)) return this.getExchangeRate.execute(command);

    const referenceDate = command.date
      ? ReferenceDate.fromString(command.date)
      : ReferenceDate.now();

    const exchangeRate = new ExchangeRate(
      from,
      to,
      command.rate,
      referenceDate,
    );

    return this.exchangeRepository.create(exchangeRate);
  }
}
