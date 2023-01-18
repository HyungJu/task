import { Currency } from './Currency';

export class ExchangeRate {
  private from: Currency;
  private to: Currency;
  private rate: number;
  private date: Date;
}
