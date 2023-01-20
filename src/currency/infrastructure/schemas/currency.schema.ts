import { Model, Schema, Types } from 'mongoose';

export type CurrencyDocument = {
  _id: Types.ObjectId;
  code: string;
  name: string;
};

export const CurrencySchema = new Schema<CurrencyDocument>({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

export type CurrencyModel = Model<CurrencyDocument>;
