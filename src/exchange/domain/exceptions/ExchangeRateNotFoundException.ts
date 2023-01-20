export class ExchangeRateNotFoundException extends Error {
  constructor() {
    super('Exchanfge Rate Not Found');
  }
}
