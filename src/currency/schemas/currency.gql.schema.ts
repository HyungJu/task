import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CurrencyGqlSchema {
  @Field()
  code!: string;

  @Field()
  name!: string;
}
