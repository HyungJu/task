import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CurrencySchema {
  @Field()
  code!: string;

  @Field()
  name!: string;
}
