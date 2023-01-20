import { Currency } from '../../domain/models/currency.model';
import { CurrencySchema } from '../../presentation/schemas/currency.schema';
import { CurrencyDocument } from '@currency/infrastructure/schemas/currency.schema';

export class CurrencyMapper {
  static toSchema(model: Currency): CurrencySchema {
    return model;
  }

  static toModel(document: CurrencyDocument): Currency {
    return new Currency(document._id.toString(), document.code, document.name);
  }
}
