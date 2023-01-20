import { Exception } from '@core/exception/Exception';

export class RuntimeException extends Exception {
  constructor(message: string) {
    super('RuntimeException', message);
  }
}
