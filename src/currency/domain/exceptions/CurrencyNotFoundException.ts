import { DomainException } from '@core/exception/DomainException';

export class CurrencyNotFoundException extends DomainException {
  constructor() {
    super('Currency Not Found');
  }
}
