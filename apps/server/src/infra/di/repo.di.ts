import { ConceptRepository } from "@domain/concept/concept.repo";
import { LinkRepository } from "@domain/link/link.repo";
import { NoteRepository } from "@domain/note/note.repo";
import { DrizzleConceptRepository } from "@infra/db/repos/concept.repo";
import { DrizzleLinkRepository } from "@infra/db/repos/link.repo";
import { DrizzleNoteRepository } from "@infra/db/repos/note.repo";
import { asImplementation } from "@infra/di/di.utils";
import type { DependencyContainer } from "tsyringe";

export const registerRepositories = (container: DependencyContainer) => {
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
