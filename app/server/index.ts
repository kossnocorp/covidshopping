import * as functions from 'firebase-functions'

export const helloWorld = functions.https.onRequest((_request, response) => {
  response.send('Hello, world!')
})

export const renderer = functions.https.onRequest((_request, response) => {
  response.send('Renderer here!')
})
