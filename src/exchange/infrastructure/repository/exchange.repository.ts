import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExchangeRepository } from '../../domain/exchange.repository';
import { ExchangeModel } from '../schemas/exchange.schema';
import { ExchangeRate } from '../../domain/models/exchange.model';

@Injectable()
export class ExchangeRepositoryImpl implements ExchangeRepository {
  constructor(@InjectModel('Exchange') private exchangeModel: ExchangeModel) {}

  public async findAll(): Promise<ExchangeRate[]> {
    return this.exchangeModel.find();
  }

  public async create(exchangeRate: ExchangeRate): Promise<ExchangeRate> {
    return this.exchangeModel.create(exchangeRate);
  }
}
