import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetExchangeRateInput {
  @Field()
  from!: string;

  @Field()
  to!: string;

  @Field()
  date!: string;
}
