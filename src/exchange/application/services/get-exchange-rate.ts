import { ApplicationService } from '../../../core/application-service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ExchangeRate } from '../../domain/models/exchange.model';
import { ExchangeRepositoryImpl } from '../../infrastructure/repository/exchange.repository';
import { FindCurrency } from '../../../currency/application/services/find-currency';

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
    const from = (await this.findCurrency.execute(input.from)) as any;
    const to = (await this.findCurrency.execute(input.to)) as any;

    if (!from || !to) throw new NotFoundException('NO CURRENCY');
    return this.exchangeRepository.get(from, to);
  }
}
