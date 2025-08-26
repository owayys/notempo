import { ConceptRepository } from "@domain/concept/concept.repo";
import { LinkRepository } from "@domain/link/link.repo";
import { ThoughtRepository } from "@domain/thought/thought.repo";
import { DrizzleConceptRepository } from "@infra/db/repos/concept.repo";
import { DrizzleLinkRepository } from "@infra/db/repos/link.repo";
import { asImplementation } from "@infra/di/di.utils";
import type { DependencyContainer } from "tsyringe";
import { DrizzleThoughtRepository } from "@/infra/db/repos/thought.repo";

export const registerRepositories = (container: DependencyContainer) => {
  container.register(
    ...asImplementation(ThoughtRepository, DrizzleThoughtRepository),
  );
  container.register(
    ...asImplementation(ConceptRepository, DrizzleConceptRepository),
  );
  container.register(
    ...asImplementation(LinkRepository, DrizzleLinkRepository),
  );
};
