import { format } from 'date-fns';

export class ReferenceDate {
  private date!: Date;

  constructor(date: Date) {
    this.date = date;
    console.log(date);
  }

  static fromDate(date: Date) {
    return new ReferenceDate(date);
  }

  static fromString(referenceDate: string) {
    return new ReferenceDate(new Date(referenceDate));
  }

  public toString(): string {
    return format(this.date, 'yyyy-MM-dd');
  }

  public toDate(): Date {
    return this.date;
  }

  public isEqual(date: ReferenceDate): boolean {
    return this.toString() === date.toString();
  }
}
