import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateCurrency } from './services/create-currency';
import { CurrencyController } from './currency.controller';
import { CurrencyRepository } from './repository/currency.repository';
import { Currency } from './models/currency.model';
import { CurrencySchema } from './schemas/currency.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Currency', schema: CurrencySchema }]),
  ],
  providers: [CreateCurrency, CurrencyRepository],
  controllers: [CurrencyController],
})
export class CurrencyModule {}
