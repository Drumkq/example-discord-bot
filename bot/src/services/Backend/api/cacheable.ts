export abstract class Cacheable<T> {
  private resolve(): Promise<T> {
    throw new Error('NotImplementedException');
  }

  public fetch(): Promise<T> {
    throw new Error('NotImplementedException');
  }
}
