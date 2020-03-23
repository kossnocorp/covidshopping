import { createRouter, InferRouteRef, route } from '@switcher/preact'
import { I18nLocaleKey } from '#app/i18n'

export const appRoutes = [
  route('home')('/')(),

  route('list')<{ listId: string }>('/l/:listId')(),

  route('localized-list')<{ localeKey: I18nLocaleKey; listId: string }>(
    '/:localeKey/l/:listId'
  )(),

  route('localized-home')<{ localeKey: I18nLocaleKey }>('/:localeKey')()
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
