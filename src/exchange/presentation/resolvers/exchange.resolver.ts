import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindAllExchangeRates } from '../../application/services/find-all-exchange-rates.service';
import { UpsertExchangeRate } from '../../application/services/upsert-exchange-rate.service';
import { CreateExchangeRateSchema } from '../schemas/create-exchange';
import { ExchangeRateSchema } from '../schemas/exchange-rate.dto';
import { GetExchangeRate } from '../../application/services/get-exchange-rate.service';
import { ExchangeSchemaMapper } from '@exchange/presentation/mapper';
import { DeleteExchangeRateSchema } from '@exchange/presentation/schemas/delete-exchange';
import { DeleteExchangeRate } from '@exchange/application/services/delete-exchange-rate.service';

@Resolver(() => ExchangeRateSchema)
export class ExchangeResolver {
  constructor(
    private getAllExchangeRatesService: FindAllExchangeRates,
    private createExchangeRateService: UpsertExchangeRate,
    private getExchangeRateService: GetExchangeRate,
    private deleteExchangeRateService: DeleteExchangeRate,
  ) {}

  @Query(() => [ExchangeRateSchema], { nullable: 'items' })
  async exchangeRates(): Promise<ExchangeRateSchema[]> {
    const exchangeRates = await this.getAllExchangeRatesService.execute();
    return exchangeRates.map(ExchangeSchemaMapper.toSchema);
  }

  @Query(() => ExchangeRateSchema, { nullable: true })
  async getExchangeRate(
    @Args('src') source: string,
    @Args('tgt') target: string,
    @Args('date', { nullable: true }) date?: string,
  ): Promise<ExchangeRateSchema> {
    return ExchangeSchemaMapper.toSchema(
      await this.getExchangeRateService.execute({
        from: source,
        to: target,
        date: date,
      }),
    );
  }

  @Mutation(() => ExchangeRateSchema)
  async postExchangeRate(
    @Args('info') input: CreateExchangeRateSchema,
  ): Promise<ExchangeRateSchema> {
    return ExchangeSchemaMapper.toSchema(
      await this.createExchangeRateService.execute({
        from: input.src,
        to: input.tgt,
        rate: input.rate,
        date: input.date,
      }),
    );
  }

  @Mutation(() => ExchangeRateSchema)
  async deleteExchangeRate(
    @Args('info') input: DeleteExchangeRateSchema,
  ): Promise<ExchangeRateSchema> {
    return ExchangeSchemaMapper.toSchema(
      await this.deleteExchangeRateService.execute({
        from: input.src,
        to: input.tgt,
        date: input.date,
      }),
    );
  }
}
