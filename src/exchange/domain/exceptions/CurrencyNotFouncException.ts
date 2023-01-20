export class CurrencyNotFouncException extends Error {
  constructor() {
    super('Curreny Not Found');
  }
}
