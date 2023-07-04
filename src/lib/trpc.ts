import { createTRPCReact } from "@trpc/react-query"

import type { AppRouter } from "@/app/server/router/root"

export const trpc = createTRPCReact<AppRouter>()
