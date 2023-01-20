import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExchangeRepository } from '../../domain/exchange.repository';
import { ExchangeRate } from '../../domain/models/exchange.model';
import { Currency } from '@currency/domain/models/currency.model';
import { ExchangeModel } from '@exchange/infrastructure/schemas/exchange.schema';
import { ExchangeMapper } from '@exchange/infrastructure/mappers';

@Injectable()
export class ExchangeRepositoryImpl implements ExchangeRepository {
  constructor(@InjectModel('Exchange') private exchangeModel: ExchangeModel) {}

  public async findAll(): Promise<ExchangeRate[]> {
    return this.exchangeModel.find().populate(['from', 'to']);
  }

  public async create(exchangeRate: ExchangeRate): Promise<ExchangeRate> {
    const document = ExchangeMapper.toDocument(exchangeRate);
    const exchange = await this.exchangeModel.create(document);
    await exchange.populate(['from', 'to']);

    return ExchangeMapper.toModel(exchange);
  }

  public async get(from: Currency, to: Currency): Promise<ExchangeRate> {
    const document = await this.exchangeModel
      .findOne({
        from: from._id,
        to: to._id,
      })
      .sort({ date: -1 })
      .populate(['from', 'to'])
      .exec();

    if (!document) throw new NotFoundException();
    return ExchangeMapper.toModel(document);
  }

  public async delete(from: Currency, to: Currency): Promise<void> {
    await this.exchangeModel.deleteMany({ from: from._id, to: to._id });
  }
}
