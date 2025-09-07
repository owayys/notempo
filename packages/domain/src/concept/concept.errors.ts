import { NotFoundError, ValidationError } from "@domain/utils/base.errors";
import type { ConceptType } from "./concept.entity";

type ConceptId = ConceptType["id"];

export class ConceptNotFoundError extends NotFoundError {
  override readonly code = "CONCEPT_NOT_FOUND" as const;

  constructor(readonly listId: ConceptId, context?: Record<string, unknown>) {
    super("Concept", listId, context);
  }
}

export class ConceptValidationError extends ValidationError {
  override readonly code = "CONCEPT_VALIDATION_ERROR" as const;
}
