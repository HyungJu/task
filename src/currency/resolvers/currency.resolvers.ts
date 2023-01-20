import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrencyGqlSchema } from '../schemas/currency.gql.schema';
import { FindCurrency } from '../services/find-currency';
import { GetAllCurrencies } from '../services/get-all-currencies';

@Resolver((of) => CurrencyGqlSchema)
export class CurrencyResolver {
  constructor(
    private findCurrency: FindCurrency,
    private getAllCurrencies: GetAllCurrencies,
  ) {}

  @Query((returns) => CurrencyGqlSchema, { nullable: true })
  async currency(@Args('code', { type: () => String }) code: string) {
    return this.findCurrency.execute(code);
  }

  @Query(() => [CurrencyGqlSchema])
  async currencies() {
    return this.getAllCurrencies.execute();
  }
}
