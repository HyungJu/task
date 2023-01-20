import { ExchangeRate } from '@exchange/domain/models/exchange.model';
import { ReferenceDate } from '@exchange/domain/models/reference-date.model';

import { CurrencyMapper } from '@currency/infrastructure/mapper';
import { ExchangeRateDocument } from '@exchange/infrastructure/schemas/exchange.schema';
import { Types } from 'mongoose';
import { NotPopulatedException } from '@core/exception/NotPopulatedException';

export class ExchangeMapper {
  public static toModel(document: ExchangeRateDocument): ExchangeRate {
    if (
      !document.from ||
      document.from instanceof Types.ObjectId ||
      !document.to ||
      document.to instanceof Types.ObjectId
    )
      throw new NotPopulatedException();

    const referenceDate = ReferenceDate.fromDate(document.date);

    return new ExchangeRate(
      CurrencyMapper.toModel(document.from),
      CurrencyMapper.toModel(document.to),
      document.rate,
      referenceDate,
    );
  }

  public static toDocument(model: ExchangeRate): ExchangeRateDocument {
    return {
      from: new Types.ObjectId(model.from._id),
      to: new Types.ObjectId(model.to._id),
      rate: model.rate,
      date: model.date.toDate(),
    };
  }
}
