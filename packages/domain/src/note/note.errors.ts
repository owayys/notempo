import { NotFoundError, ValidationError } from "@domain/utils/base.errors";
import type { NoteType } from "./note.schema";

type NoteId = NoteType["id"];

export class NoteNotFoundError extends NotFoundError {
  override readonly code = "NOTE_NOT_FOUND" as const;

  constructor(readonly listId: NoteId, context?: Record<string, unknown>) {
    super("Note", listId, context);
  }
}

export class NoteValidationError extends ValidationError {
  override readonly code = "NOTE_VALIDATION_ERROR" as const;
}
