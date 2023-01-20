import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('ExchangeInfo')
export class ExchangeRateSchema {
  @Field()
  public src!: string;

  @Field()
  public tgt!: string;

  @Field()
  public rate!: number;

  @Field()
  public date!: string;
}
