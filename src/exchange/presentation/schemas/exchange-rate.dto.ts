import { Field, ObjectType } from '@nestjs/graphql';
import { CurrencySchema } from '../../../currency/presentation/schemas/currency.schema';

@ObjectType()
export class ExchangeRateSchema {
  @Field(() => CurrencySchema)
  private from: CurrencySchema;
  @Field(() => CurrencySchema)
  private to: CurrencySchema;
  @Field()
  private rate: number;
  @Field()
  private date: Date;
}
