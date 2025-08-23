import { ConceptRepository } from "@domain/concept";
import { LinkRepository } from "@domain/link";
import { NoteRepository } from "@domain/note";
import {
  DrizzleConceptRepository,
  DrizzleLinkRepository,
  DrizzleNoteRepository,
} from "@infra/db/repos";
import { asImplementation } from "@infra/di/di.utils";
import { container } from "tsyringe";

export const registerRepositories = () => {
  container.register(
    ...asImplementation(NoteRepository, DrizzleNoteRepository)
  );
  container.register(
    ...asImplementation(ConceptRepository, DrizzleConceptRepository)
  );
  container.register(
    ...asImplementation(LinkRepository, DrizzleLinkRepository)
  );
};
