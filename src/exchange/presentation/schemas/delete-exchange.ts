import { Field, InputType } from '@nestjs/graphql';

@InputType('InputDeleteExchangeInfo')
export class DeleteExchangeRateSchema {
  @Field()
  src!: string;

  @Field()
  tgt!: string;

  @Field()
  date!: string;
}
