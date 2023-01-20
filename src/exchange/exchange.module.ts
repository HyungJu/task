import { MongooseModule } from '@nestjs/mongoose';
import { GqlModule } from '../core/module.decorator';
import { ExchangeSchema } from './infrastructure/schemas/exchange.schema';
import { GetAllExchangeRates } from './application/services/get-all-exchange-rates';
import { ExchangeResolver } from './presentation/resolvers/exchange.resolver';
import { ExchangeRepositoryImpl } from './infrastructure/repository/exchange.repository';
import { CreateExchangeRate } from './application/services/create-exchange-rate';
import { CurrencyModule } from '../currency/currency.module';

@GqlModule({
  imports: [
    MongooseModule.forFeature([{ name: 'Exchange', schema: ExchangeSchema }]),
    CurrencyModule,
  ],
  providers: [ExchangeRepositoryImpl],
  usecases: [GetAllExchangeRates, CreateExchangeRate],
  resolvers: [ExchangeResolver],
  controllers: [],
})
export class ExchangeModule {}
