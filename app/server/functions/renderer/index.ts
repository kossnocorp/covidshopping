import template from '#app/template'
import * as functions from 'firebase-functions'
import { h } from 'preact'
import { render } from 'preact-render-to-string'
import UI from '#app/UI'
import { resolveLocation } from '#app/router'
import { locales } from '#app/i18n'

const renderer = functions.https.onRequest((request, response) => {
  const initialURL = getURL(request)
  const location = resolveLocation(initialURL)

  const locale =
    location.params && 'localeKey' in location.params
      ? locales[location.params.localeKey]
      : locales.en
  const title = locale.title
  const description = locale.description

  const html = render(h(UI, { initialURL }))
  response.send(template({ title, description, html }))
})
export default renderer

function getURL(request: functions.Request) {
  const { protocol, url } = request
  return protocol + '://' + request.get('host') + url
}
