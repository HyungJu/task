import { Currency } from '../../../currency/domain/models/currency.model';

export class ExchangeRate {
  constructor(
    readonly from: Currency,
    readonly to: Currency,
    readonly rate: number,
    readonly date: Date,
  ) {}
}
