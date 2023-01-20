import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Currency } from '../../../currency/domain/models/currency.model';

@Schema()
class ExchangeRate {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Currency',
  })
  from!: Currency;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Currency',
  })
  to!: Currency;

  @Prop()
  rate!: number;

  @Prop()
  date!: Date;
}

export const ExchangeSchema = SchemaFactory.createForClass(ExchangeRate);
export type ExchangeModel = Model<ExchangeRate>;
