import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCurrencyInput {
  @Field()
  code!: string;

  @Field()
  name!: string;
}
