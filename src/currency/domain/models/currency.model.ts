export class Currency {
  readonly _id?: string;

  readonly code!: string;

  readonly name!: string;

  constructor(id: string | undefined, code: string, name: string) {
    this._id = id;
    this.code = code;
    this.name = name;
  }

  public isEqual(currency: Currency): boolean {
    return !!(this._id && currency._id && this._id == currency._id);
  }
}
