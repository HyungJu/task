import { HttpException } from '@nestjs/common';

export class DuplicateCurrencyCodeException extends HttpException {
  constructor() {
    super('Duplicate Currency Code', 400);
  }
}
