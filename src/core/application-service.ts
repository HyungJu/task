export interface ApplicationService<I, O> {
  execute(command: I): Promise<O> | O;
}
