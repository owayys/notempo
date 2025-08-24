import type { DependencyContainer } from "tsyringe";
import { registerRepositories } from "./repo.di";
import { registerWorkflows } from "./workflows.di";

export const wireDI = (container: DependencyContainer) => {
  console.log("Wiring DI...");
  console.log("Registering Repositories...");
  registerRepositories(container);
  console.log("Registering Workflows...");
  registerWorkflows(container);
};
