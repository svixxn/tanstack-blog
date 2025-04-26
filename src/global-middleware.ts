import { registerGlobalMiddleware } from "@tanstack/react-start";
import { logMiddleware } from "./lib/logging";

registerGlobalMiddleware({
  middleware: [logMiddleware],
});
