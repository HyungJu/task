import { Exception } from '@core/exception/Exception';

export class DomainException extends Exception {
  constructor(message: string) {
    super('DomainException', message);
  }
}
