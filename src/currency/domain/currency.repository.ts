import { Currency } from './models/currency.model';

export interface CurrencyRepository {
  findAll(): Promise<Currency[]>;

  insert(currency: Currency): Promise<Currency>;

  findByCode(code: string): Promise<Currency | null>;

  removeByCode(code: string): Promise<void>;
}
