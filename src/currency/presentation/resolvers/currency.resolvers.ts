import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindCurrency } from '../../application/services/find-currency';
import { GetAllCurrencies } from '../../application/services/get-all-currencies';
import { CurrencySchema } from '../schemas/currency.schema';
import { CreateCurrencyInput } from '../schemas/create-currency.schema';
import { CreateCurrency } from '../../application/services/create-currency';

@Resolver((of) => CurrencySchema)
export class CurrencyResolver {
  constructor(
    private findCurrencyService: FindCurrency,
    private getAllCurrenciesService: GetAllCurrencies,
    private createCurrencyService: CreateCurrency,
  ) {}

  @Query((returns) => CurrencySchema, { nullable: true })
  async currency(@Args('code', { type: () => String }) code: string) {
    return this.findCurrencyService.execute(code);
  }

  @Query(() => [CurrencySchema])
  async currencies() {
    return this.getAllCurrenciesService.execute();
  }

  @Mutation((returns) => CurrencySchema)
  createCurrency(@Args('createCurrencyInput') input: CreateCurrencyInput) {
    return this.createCurrencyService.execute(input);
  }
}