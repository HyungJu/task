import { Currency } from '../../domain/models/currency.model';
import { HydratedDocument } from 'mongoose';
import { CurrencySchema } from '../../presentation/schemas/currency.schema';

export class CurrencyMapper {
  static toSchema(model: Currency): CurrencySchema {
    return model;
  }

  static toModel(document: HydratedDocument<CurrencySchema>): Currency {
    return new Currency(document.id, document.code, document.name);
  }
}
