import { MongooseModule } from '@nestjs/mongoose';
import { GqlModule } from '../core/module.decorator';
import { ExchangeSchema } from './infrastructure/schemas/exchange.schema';
import { FindAllExchangeRates } from './application/services/find-all-exchange-rates.service';
import { ExchangeResolver } from './presentation/resolvers/exchange.resolver';
import { ExchangeRepositoryImpl } from './infrastructure/repository/exchange.repository';
import { UpsertExchangeRate } from './application/services/upsert-exchange-rate.service';
import { CurrencyModule } from '../currency/currency.module';
import { GetExchangeRate } from './application/services/get-exchange-rate.service';
import { DeleteExchangeRate } from '@exchange/application/services/delete-exchange-rate.service';

@GqlModule({
  imports: [
    MongooseModule.forFeature([{ name: 'Exchange', schema: ExchangeSchema }]),
    CurrencyModule,
  ],
  providers: [ExchangeRepositoryImpl],
  usecases: [
    FindAllExchangeRates,
    UpsertExchangeRate,
    GetExchangeRate,
    DeleteExchangeRate,
  ],
  resolvers: [ExchangeResolver],
  controllers: [],
})
export class ExchangeModule {}
