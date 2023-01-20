import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetAllExchangeRates } from '../../application/services/get-all-exchange-rates';
import { CreateExchangeRate } from '../../application/services/create-exchange-rate';
import { CreateExchangeRateSchema } from '../schemas/create-exchange';
import { ExchangeRateSchema } from '../schemas/exchange-rate.dto';

@Resolver((of) => ExchangeRateSchema)
export class ExchangeResolver {
  constructor(
    private getAllExchangeRatesService: GetAllExchangeRates,
    private createExchangeRateService: CreateExchangeRate,
  ) {}

  @Query(() => [ExchangeRateSchema])
  async exchangeRates() {
    const a = await this.getAllExchangeRatesService.execute();
    console.log(a);
    return a;
  }

  @Mutation((returns) => ExchangeRateSchema)
  createExchangeRate(@Args('input') input: CreateExchangeRateSchema) {
    return this.createExchangeRateService.execute(input);
  }
}
