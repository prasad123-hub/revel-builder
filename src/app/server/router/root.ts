import { router } from "../trpc"
import { formRouter } from "./form"
import { projectRouter } from "./project"

export const appRouter = router({
  project: projectRouter,
  form: formRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
