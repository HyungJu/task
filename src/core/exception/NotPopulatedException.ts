import { RuntimeException } from '@core/exception/RuntimeException';

export class NotPopulatedException extends RuntimeException {
  constructor() {
    super('Not Populated');
  }
}
