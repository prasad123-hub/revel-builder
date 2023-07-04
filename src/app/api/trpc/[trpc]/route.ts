import { NextRequest } from "next/server"
import {
  FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch"

import { appRouter } from "@/app/server/router/root"
import { createTRPCContext } from "@/app/server/trpc"

const handler = (req: NextRequest) => {
  console.log(`incoming request ${req.url}`)
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: req,
    router: appRouter,
    createContext: () => createTRPCContext({ req }),
    onError: ({ error }) => {
      console.log("Error in tRPC handler")
      console.error(error)
    },
  })
}

export { handler as GET, handler as POST }
