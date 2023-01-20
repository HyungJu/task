import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExchangeRepository } from '../../domain/exchange.repository';
import { ExchangeModel } from '../schemas/exchange.schema';
import { ExchangeRate } from '../../domain/models/exchange.model';
import { Currency } from '@currency/domain/models/currency.model';

@Injectable()
export class ExchangeRepositoryImpl implements ExchangeRepository {
  constructor(@InjectModel('Exchange') private exchangeModel: ExchangeModel) {}

  public async findAll(): Promise<ExchangeRate[]> {
    return this.exchangeModel.find().populate(['from', 'to']);
  }

  public async create(exchangeRate: ExchangeRate): Promise<ExchangeRate> {
    return this.exchangeModel.create(exchangeRate);
  }

  public async get(from: Currency, to: Currency): Promise<ExchangeRate> {
    return this.exchangeModel
      .findOne({
        from: from._id,
        to: to._id,
      })
      .sort({ date: -1 })
      .populate(['from', 'to']);
  }

  public async delete(from: Currency, to: Currency): Promise<void> {
    await this.exchangeModel.deleteMany({ from: from._id, to: to._id });
  }
}
