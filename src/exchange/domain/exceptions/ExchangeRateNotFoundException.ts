import { DomainException } from '@core/exception/DomainException';

export class ExchangeRateNotFoundException extends DomainException {
  constructor() {
    super('Exchange Rate Not Found');
  }
}
