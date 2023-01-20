import { Injectable } from '@nestjs/common';
import { CurrencyRepositoryImpl } from '../../infrastructure/repository/currency.repository';
import { ApplicationService } from '../../../core/application-service';

@Injectable()
export class CreateCurrency implements ApplicationService<string, void> {
  constructor(private currencyRepository: CurrencyRepositoryImpl) {}

  public async execute(code: string) {
    return this.currencyRepository.removeByCode(code);
  }
}
