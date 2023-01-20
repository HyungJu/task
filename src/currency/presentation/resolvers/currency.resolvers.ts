import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindCurrency } from '../../application/services/find-currency';
import { GetAllCurrencies } from '../../application/services/get-all-currencies';
import { CurrencySchema } from '../schemas/currency.schema';
import { CreateCurrencyInput } from '../schemas/create-currency.schema';
import { CreateCurrency } from '../../application/services/create-currency';
import { DeleteCurrency } from '../../application/services/delete-currency';

@Resolver(() => CurrencySchema)
export class CurrencyResolver {
  constructor(
    private findCurrencyService: FindCurrency,
    private getAllCurrenciesService: GetAllCurrencies,
    private createCurrencyService: CreateCurrency,
    private deleteCurrencyService: DeleteCurrency,
  ) {}

  @Query(() => CurrencySchema, { nullable: true })
  async currency(
    @Args('code', { type: () => String }) code: string,
  ): Promise<CurrencySchema | null> {
    return this.findCurrencyService.execute(code);
  }

  @Query(() => [CurrencySchema])
  async currencies(): Promise<CurrencySchema[]> {
    return this.getAllCurrenciesService.execute();
  }

  @Mutation(() => CurrencySchema)
  async createCurrency(
    @Args('createCurrencyInput') input: CreateCurrencyInput,
  ): Promise<CurrencySchema> {
    return this.createCurrencyService.execute(input);
  }

  @Mutation(() => Boolean)
  deleteCurrency(
    @Args('code', { type: () => String }) code: string,
  ): Promise<boolean> {
    return this.deleteCurrencyService.execute(code);
  }
}
