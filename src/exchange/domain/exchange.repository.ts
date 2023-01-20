import { ExchangeRate } from './models/exchange.model';
import { Currency } from '@currency/domain/models/currency.model';

export interface ExchangeRepository {
  findAll(): Promise<ExchangeRate[]>;

  create(exchangeRate: ExchangeRate): Promise<ExchangeRate>;

  get(from: Currency, to: Currency): Promise<ExchangeRate>;
}
