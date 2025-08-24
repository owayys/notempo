import { NotFoundError, ValidationError } from "@domain/utils/base.errors";
import type { LinkType } from "./link.schema";

type LinkId = LinkType["id"];

export class LinkNotFoundError extends NotFoundError {
  override readonly code = "LINK_NOT_FOUND" as const;

  constructor(readonly listId: LinkId, context?: Record<string, unknown>) {
    super("Link", listId, context);
  }
}

export class LinkValidationError extends ValidationError {
  override readonly code = "LINK_VALIDATION_ERROR" as const;
}
