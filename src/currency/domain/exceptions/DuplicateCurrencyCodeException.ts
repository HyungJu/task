import { DomainException } from '@core/exception/DomainException';

export class DuplicateCurrencyCodeException extends DomainException {
  constructor() {
    super('Duplicated Currency Code');
  }
}
