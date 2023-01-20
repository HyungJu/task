import { ApplicationService } from '../../../core/application-service';
import { Injectable } from '@nestjs/common';
import { ExchangeRate } from '../../domain/models/exchange.model';
import { ExchangeRepositoryImpl } from '../../infrastructure/repository/exchange.repository';
import { FindCurrency } from '../../../currency/application/services/find-currency';
import { CurrencyNotFouncException } from '@exchange/domain/exceptions/CurrencyNotFouncException';

export type GetExchangeRateInput = {
  from: string;
  to: string;
};

@Injectable()
export class GetExchangeRate
  implements ApplicationService<GetExchangeRateInput, ExchangeRate>
{
  constructor(
    private exchangeRepository: ExchangeRepositoryImpl,
    private findCurrency: FindCurrency,
  ) {}

  public async execute(input: GetExchangeRateInput): Promise<ExchangeRate> {
    const from = await this.findCurrency.execute(input.from);
    const to = await this.findCurrency.execute(input.to);
    if (!from || !to) throw new CurrencyNotFouncException();

    return this.exchangeRepository.get(from, to);
  }
}
