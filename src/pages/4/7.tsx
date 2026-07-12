export abstract class BaseHandler<T, X> {
  public abstract handle(props: X): Promise<T | undefined>;
}
