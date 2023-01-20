import { Field, InputType } from '@nestjs/graphql';

@InputType('InputUpdateExchangeInfo')
export class CreateExchangeRateSchema {
  @Field()
  src!: string;

  @Field()
  tgt!: string;

  @Field()
  rate!: number;

  @Field({ nullable: true })
  date?: string;
}
