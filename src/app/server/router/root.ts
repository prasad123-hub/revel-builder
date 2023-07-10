import { router } from "../trpc"
import { formRouter } from "./form"
import { projectRouter } from "./project"
import { responseRouter } from "./response"

export const appRouter = router({
  project: projectRouter,
  form: formRouter,
  response: responseRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
