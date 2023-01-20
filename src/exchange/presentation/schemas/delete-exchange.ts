import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteExchangeRateSchema {
  @Field()
  from!: string;

  @Field()
  to!: string;

  @Field()
  date!: string;
}
