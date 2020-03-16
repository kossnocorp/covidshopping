import { createRouter, InferRouteRef, route } from '@switcher/preact'

export const appRoutes = [
  route('home')('/')({
    title: 'The Caronavirus shopping list generator',
    description:
      "What to buy and what to cook during the coronavirus? How to survive quarantine? Tell us how big your family is, your diet, and we'll generate you a rational shopping list."
  })
]

// Routing methods
export const {
  buildHref,
  useRouter,
  RouterContext,
  RouterLink,
  resolveLocation,
  refToLocation
} = createRouter(appRoutes)

// Type to use in prop definitions
export type AppRouteRef = InferRouteRef<typeof appRoutes>
