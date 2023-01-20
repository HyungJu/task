export class ResponseEntity<T> {
  success!: boolean;
  message!: string;
  data!: T;
}
