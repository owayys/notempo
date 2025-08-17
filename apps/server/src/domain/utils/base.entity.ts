import type { UUID } from "@domain/utils/refined.type";
import { randomUUID } from "node:crypto";

export type BaseEntityType<E extends string> = {
  id: UUID<E>;
  createdAt: Date;
  updatedAt: Date;
};

export class BaseEntity<E extends string> {
  id: UUID<E>;
  createdAt: Date;
  updatedAt: Date;

  protected constructor(data: BaseEntityType<E>) {
    this.id = data.id as UUID<E>;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static init() {
    return {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
