import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateExchangeRateSchema {
  @Field()
  from!: string;

  @Field()
  to!: string;

  @Field()
  rate!: number;

  @Field({ nullable: true })
  date?: Date;
}
