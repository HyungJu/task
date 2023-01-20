import { Currency } from '@currency/domain/models/currency.model';
import { ReferenceDate } from '@exchange/domain/models/reference-date.model';

export class ExchangeRate {
  constructor(
    readonly from: Currency,
    readonly to: Currency,
    readonly rate: number,
    readonly date: ReferenceDate,
  ) {}
}
