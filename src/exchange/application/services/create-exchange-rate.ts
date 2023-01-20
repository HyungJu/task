import { ApplicationService } from '../../../core/application-service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ExchangeRate } from '../../domain/models/exchange.model';
import { ExchangeRepositoryImpl } from '../../infrastructure/repository/exchange.repository';
import { FindCurrency } from '../../../currency/application/services/find-currency';

export class CreateExchangeRateDto {
  from: string;
  to: string;
  rate: number;
  date: Date;
}

@Injectable()
export class CreateExchangeRate
  implements ApplicationService<CreateExchangeRateDto, ExchangeRate>
{
  constructor(
    private exchangeRepository: ExchangeRepositoryImpl,
    private findCurrency: FindCurrency,
  ) {}

  public async execute(dto: CreateExchangeRateDto): Promise<ExchangeRate> {
    const from = await this.findCurrency.execute(dto.from);
    const to = await this.findCurrency.execute(dto.to);

    if (!from || !to) throw new NotFoundException();

    return this.exchangeRepository.create({
      from,
      to,
      rate: dto.rate,
      date: dto.date,
    });
  }
}
