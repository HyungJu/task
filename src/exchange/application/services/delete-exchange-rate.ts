import { ApplicationService } from '../../../core/application-service';
import { Injectable } from '@nestjs/common';
import { ExchangeRate } from '../../domain/models/exchange.model';
import { ExchangeRepositoryImpl } from '../../infrastructure/repository/exchange.repository';
import { DeleteExchangeRateInput } from '@exchange/application/dtos/delete-exchange-rate.dto';
import { CurrencyNotFouncException } from '@exchange/domain/exceptions/CurrencyNotFouncException';
import { FindCurrency } from '@currency/application/services/find-currency';
import { ReferenceDate } from '@exchange/domain/models/reference-date.model';

@Injectable()
export class DeleteExchangeRate
  implements ApplicationService<DeleteExchangeRateInput, ExchangeRate>
{
  constructor(
    private exchangeRepository: ExchangeRepositoryImpl,
    private findCurrency: FindCurrency,
  ) {}

  public async execute(dto: DeleteExchangeRateInput): Promise<ExchangeRate> {
    const from = await this.findCurrency.execute(dto.from);
    const to = await this.findCurrency.execute(dto.to);
    const date = ReferenceDate.fromString(dto.date);

    if (!from || !to) throw new CurrencyNotFouncException();

    return this.exchangeRepository.delete(from, to, date);
  }
}
