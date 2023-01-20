import { MongooseModule } from '@nestjs/mongoose';
import { CreateCurrency } from './application/services/create-currency';
import { Currency } from './domain/models/currency.model';
import { CurrencySchema } from './infrastructure/schemas/currency.schema';
import { CurrencyResolver } from './presentation/resolvers/currency.resolvers';
import { FindCurrency } from './application/services/find-currency';
import { GetAllCurrencies } from './application/services/get-all-currencies';
import { CurrencyRepositoryImpl } from './infrastructure/repository/currency.repository';
import { GqlModule } from '../core/module.decorator';
import { DeleteCurrency } from './application/services/delete-currency';

@GqlModule({
  imports: [
    MongooseModule.forFeature([{ name: 'Currency', schema: CurrencySchema }]),
  ],
  providers: [CurrencyRepositoryImpl],
  usecases: [CreateCurrency, FindCurrency, GetAllCurrencies, DeleteCurrency],
  resolvers: [CurrencyResolver],
  controllers: [],
})
export class CurrencyModule {}
