import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetAllExchangeRates } from '../../application/services/get-all-exchange-rates';
import { CreateExchangeRate } from '../../application/services/create-exchange-rate';
import { CreateExchangeRateSchema } from '../schemas/create-exchange';
import { ExchangeRateSchema } from '../schemas/exchange-rate.dto';
import { GetExchangeRate } from '../../application/services/get-exchange-rate';
import { GetExchangeRateInput } from '../schemas/get-exchange-rate';
import { ExchangeSchemaMapper } from '@exchange/presentation/mapper';
import { DeleteExchangeRateSchema } from '@exchange/presentation/schemas/delete-exchange';
import { DeleteExchangeRate } from '@exchange/application/services/delete-exchange-rate';

@Resolver(() => ExchangeRateSchema)
export class ExchangeResolver {
  constructor(
    private getAllExchangeRatesService: GetAllExchangeRates,
    private createExchangeRateService: CreateExchangeRate,
    private getExchangeRateService: GetExchangeRate,
    private deleteExchangeRateService: DeleteExchangeRate,
  ) {}

  @Query(() => [ExchangeRateSchema], { nullable: 'items' })
  async exchangeRates(): Promise<ExchangeRateSchema[]> {
    return (await this.getAllExchangeRatesService.execute()).map(
      ExchangeSchemaMapper.toSchema,
    );
  }

  @Query(() => ExchangeRateSchema, { nullable: true })
  async exchangeRate(
    @Args('input') input: GetExchangeRateInput,
  ): Promise<ExchangeRateSchema> {
    return ExchangeSchemaMapper.toSchema(
      await this.getExchangeRateService.execute(input),
    );
  }

  @Mutation((returns) => ExchangeRateSchema)
  async createExchangeRate(
    @Args('input') input: CreateExchangeRateSchema,
  ): Promise<ExchangeRateSchema> {
    return ExchangeSchemaMapper.toSchema(
      await this.createExchangeRateService.execute(input),
    );
  }

  @Mutation((returns) => ExchangeRateSchema)
  async deleteExchangeRate(
    @Args('input') input: DeleteExchangeRateSchema,
  ): Promise<ExchangeRateSchema> {
    return ExchangeSchemaMapper.toSchema(
      await this.deleteExchangeRateService.execute(input),
    );
  }
}
