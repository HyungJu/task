import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindCurrency } from '../../application/services/find-currency';
import { GetAllCurrencies } from '../../application/services/get-all-currencies';
import { CurrencySchema } from '../schemas/currency.schema';

@Resolver((of) => CurrencySchema)
export class CurrencyResolver {
  constructor(
    private findCurrency: FindCurrency,
    private getAllCurrencies: GetAllCurrencies,
  ) {}

  @Query((returns) => CurrencySchema, { nullable: true })
  async currency(@Args('code', { type: () => String }) code: string) {
    return this.findCurrency.execute(code);
  }

  @Query(() => [CurrencySchema])
  async currencies() {
    return this.getAllCurrencies.execute();
  }
}
