import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Currency } from '../../domain/models/currency.model';
import { CurrencyModel } from '../schemas/currency.schema';
import { CurrencyRepository } from '../../domain/currency.repository';

@Injectable()
export class CurrencyRepositoryImpl implements CurrencyRepository {
  constructor(@InjectModel('Currency') private currencyModel: CurrencyModel) {}

  public async findAll(): Promise<Currency[]> {
    return this.currencyModel.find();
  }

  public async insert(currency: Currency): Promise<Currency> {
    return this.currencyModel.create(currency);
  }

  public async findByCode(code: string): Promise<Currency | null> {
    const currency = await this.currencyModel.findOne({ code });
    if (!currency) return null;

    return currency;
  }

  public async removeByCode(code: string) {
    const currency = await this.findByCode(code);
    await this.currencyModel.remove(currency);
  }
}