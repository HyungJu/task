import { Injectable } from '@nestjs/common';
import { CurrencyRepositoryImpl } from '@currency/infrastructure/repository/currency.repository';
import { ApplicationService } from '@core/application-service';

@Injectable()
export class DeleteCurrency implements ApplicationService<string, boolean> {
  constructor(private currencyRepository: CurrencyRepositoryImpl) {}

  public async execute(code: string) {
    await this.currencyRepository.removeByCode(code);
    return true;
  }
}
