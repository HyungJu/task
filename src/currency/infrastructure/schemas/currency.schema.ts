import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Schema()
export class Currency {
  @Prop({ unique: true, index: true })
  code!: string;

  @Prop()
  name!: string;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
export type CurrencyModel = Model<Currency>;
