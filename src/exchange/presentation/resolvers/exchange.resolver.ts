import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetAllExchangeRates } from '../../application/services/get-all-exchange-rates';
import { CreateExchangeRate } from '../../application/services/create-exchange-rate';
import { CreateExchangeRateSchema } from '../schemas/create-exchange';
import { ExchangeRateSchema } from '../schemas/exchange-rate.dto';
import { GetExchangeRate } from '../../application/services/get-exchange-rate';
import { GetExchangeRateInput } from '../schemas/get-exchange-rate';

@Resolver((of) => ExchangeRateSchema)
export class ExchangeResolver {
  constructor(
    private getAllExchangeRatesService: GetAllExchangeRates,
    private createExchangeRateService: CreateExchangeRate,
    private getExchangeRateService: GetExchangeRate,
  ) {}

  @Query(() => [ExchangeRateSchema], { nullable: 'items' })
  async exchangeRates() {
    const a = await this.getAllExchangeRatesService.execute();
    console.log(a);
    return a;
  }

  @Query(() => ExchangeRateSchema, { nullable: true })
  async exchangeRate(@Args('input') input: GetExchangeRateInput) {
    return this.getExchangeRateService.execute(input);
  }

  @Mutation((returns) => ExchangeRateSchema)
  createExchangeRate(@Args('input') input: CreateExchangeRateSchema) {
    return this.createExchangeRateService.execute(input);
  }
}
