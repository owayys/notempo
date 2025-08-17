import type { BaseEntityType } from "@domain/utils/base.entity";

type Brand<T> = { __brand: T };

export type UUID<A extends string> =
  `${string}-${string}-${string}-${string}-${string}` & Brand<`${A}Id`>;

export type EntityType<E extends string, A> = BaseEntityType<E> & A;

export type EntityCreateData<T> = Omit<T, keyof BaseEntityType<string>>;
