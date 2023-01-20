import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ErrorResponse {
  @Field()
  code!: string;

  @Field()
  message!: string;
}
