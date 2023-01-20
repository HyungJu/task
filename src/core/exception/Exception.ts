export class Exception extends Error {
  public readonly type!: string;

  constructor(type: string, payload: any) {
    super(JSON.stringify(payload));
    this.type = type;
  }
}
