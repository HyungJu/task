import { ExchangeRate } from './models/exchange.model';

export interface ExchangeRepository {
  findAll(): Promise<ExchangeRate[]>;

  create(exchangeRate: ExchangeRate): Promise<ExchangeRate>;
}
