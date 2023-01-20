import { Field, ObjectType } from '@nestjs/graphql';
import { CurrencySchema } from '../../../currency/presentation/schemas/currency.schema';

@ObjectType()
export class ExchangeRateSchema {
  @Field(() => CurrencySchema)
  public from!: CurrencySchema;

  @Field(() => CurrencySchema)
  public to!: CurrencySchema;

  @Field()
  public rate!: number;

  @Field()
  public date!: string;
}
