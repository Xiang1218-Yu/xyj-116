export interface IRepository<T, TQuery = Record<string, unknown>> {
  findAll(): T[];
  findById(id: string): T | undefined;
  findOne(query: TQuery): T | undefined;
  findMany(query: TQuery): T[];
  exists(id: string): boolean;
  count(query?: TQuery): number;
}

export interface IReadonlyRepository<T, TQuery = Record<string, unknown>> {
  findAll(): readonly T[];
  findById(id: string): T | undefined;
  findOne(query: TQuery): T | undefined;
  findMany(query: TQuery): readonly T[];
  exists(id: string): boolean;
  count(query?: TQuery): number;
}
