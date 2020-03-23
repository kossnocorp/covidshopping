import { RouterContext, useRouter } from '#app/router'
import { h } from 'preact'
import { useContext, useEffect, useState } from 'preact/hooks'
import HomePage from './HomePage'
import ShoppingListPage from './ShoppingListPage'
import './style'
import { I18nContext, locales } from '#app/i18n'

export default function UI({ initialURL }: { initialURL: string }) {
  const router = useRouter(initialURL)

  const localeKey =
    router.location.params && 'localeKey' in router.location.params
      ? router.location.params.localeKey
      : 'en'
  const locale = locales[localeKey]

  return (
    <I18nContext.Provider value={{ localeKey, locale }}>
      <RouterContext.Provider value={router}>
        <Content />
      </RouterContext.Provider>
    </I18nContext.Provider>
  )
}

function Content() {
  const { location } = useContext(RouterContext)

  switch (location.name) {
    case 'home':
    case 'localized-home':
      return <HomePage />

    case 'list':
    case 'localized-list':
      return <ShoppingListPage listId={location.params.listId} />

    case '404':
    default:
      return <div>404</div>
  }
}
