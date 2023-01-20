export class Currency {
  readonly code!: string;

  readonly name!: string;

  constructor(code: string, name: string) {
    this.code = code;
    this.name = name;
  }
}
