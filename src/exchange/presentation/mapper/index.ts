import { ExchangeRate } from '@exchange/domain/models/exchange.model';
import { ExchangeRateSchema } from '@exchange/presentation/schemas/exchange-rate.dto';

export class ExchangeSchemaMapper {
  public static toSchema(exchangeRate: ExchangeRate): ExchangeRateSchema {
    return {
      src: exchangeRate.from.code,
      tgt: exchangeRate.to.code,
      rate: exchangeRate.rate,
      date: exchangeRate.date.toString(),
    };
  }
}
