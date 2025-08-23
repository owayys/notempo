import { registerRepositories } from "./repo.di";
import { registerWorkflows } from "./workflows.di";

export const wireDI = () => {
  registerRepositories(), registerWorkflows();
};
