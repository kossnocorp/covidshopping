import template from '#app/template'
import * as functions from 'firebase-functions'
import { h } from 'preact'
import { render } from 'preact-render-to-string'
import UI from '#app/UI'
import { resolveLocation } from '#app/router'

const renderer = functions.https.onRequest((request, response) => {
  const initialURL = getURL(request)
  const location = resolveLocation(initialURL)
  const { title, description } = location.meta

  const html = render(h(UI, { initialURL }))
  response.send(template({ title, description, html }))
})
export default renderer

function getURL(request: functions.Request) {
  const { protocol, url } = request
  return protocol + '://' + request.get('host') + url
}
