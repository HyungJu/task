import { Document, Model, PopulatedDoc, Schema, Types } from 'mongoose';
import { CurrencyDocument } from '@currency/infrastructure/schemas/currency.schema';

export type ExchangeRateDocument = {
  from: PopulatedDoc<Document<Types.ObjectId> & CurrencyDocument>;
  to: PopulatedDoc<Document<Types.ObjectId> & CurrencyDocument>;
  rate: number;
  date: Date;
};

export const ExchangeSchema = new Schema<ExchangeRateDocument>({
  from: { type: Schema.Types.ObjectId, required: true, ref: 'Currency' },
  to: { type: Schema.Types.ObjectId, required: true, ref: 'Currency' },
  rate: { type: Number, required: true },
  date: { type: Date, required: true },
});

export type ExchangeModel = Model<ExchangeRateDocument>;
