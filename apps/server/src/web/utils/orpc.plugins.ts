import {
  ResponseHeadersPlugin,
  StrictGetMethodPlugin,
} from "@orpc/server/plugins";
import type { AppContext } from "@web/types";

export const commonPlugins = [
  new StrictGetMethodPlugin<AppContext>(),
  new ResponseHeadersPlugin<AppContext>(),
] as const;
