import { NotFoundError, ValidationError } from "@domain/utils/base.errors";
import type { ThoughtType } from "./thought.schema";

type ThoughtId = ThoughtType["id"];

export class ThoughtNotFoundError extends NotFoundError {
  override readonly code = "NOTE_NOT_FOUND" as const;

  constructor(readonly listId: ThoughtId, context?: Record<string, unknown>) {
    super("Thought", listId, context);
  }
}

export class ThoughtValidationError extends ValidationError {
  override readonly code = "NOTE_VALIDATION_ERROR" as const;
}
