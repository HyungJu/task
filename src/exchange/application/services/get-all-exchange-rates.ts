import { ApplicationService } from '../../../core/application-service';
import { Injectable } from '@nestjs/common';
import { ExchangeRate } from '../../domain/models/exchange.model';
import { ExchangeRepositoryImpl } from '../../infrastructure/repository/exchange.repository';

@Injectable()
export class GetAllExchangeRates
  implements ApplicationService<void, ExchangeRate[]>
{
  constructor(private exchangeRepository: ExchangeRepositoryImpl) {}

  public async execute(): Promise<ExchangeRate[]> {
    const result = await this.exchangeRepository.findAll();
    console.log(result);
    return result;
  }
}
