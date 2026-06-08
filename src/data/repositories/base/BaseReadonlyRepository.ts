import { IReadonlyRepository } from './IRepository';

export type QueryPredicate<T> = (item: T) => boolean;

export abstract class BaseReadonlyRepository<T, TQuery = QueryPredicate<T>>
  implements IReadonlyRepository<T, TQuery>
{
  protected abstract getDataSource(): readonly T[];

  protected abstract matches(item: T, query: TQuery): boolean;

  findAll(): readonly T[] {
    return this.getDataSource();
  }

  findById(id: string): T | undefined {
    return this.getDataSource().find((item) => (item as { id: string }).id === id);
  }

  findOne(query: TQuery): T | undefined {
    return this.getDataSource().find((item) => this.matches(item, query));
  }

  findMany(query: TQuery): readonly T[] {
    return this.getDataSource().filter((item) => this.matches(item, query));
  }

  exists(id: string): boolean {
    return this.getDataSource().some((item) => (item as { id: string }).id === id);
  }

  count(query?: TQuery): number {
    if (!query) return this.getDataSource().length;
    return this.getDataSource().filter((item) => this.matches(item, query)).length;
  }
}
