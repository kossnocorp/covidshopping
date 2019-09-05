import { entryPath } from 'firebun/server/template'
import { appConfig } from '#app/config'

export default function template() {
  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${appConfig.name}</title>
  </head>
  <body>
    <link rel="stylesheet" type="text/css" href="${entryPath('web', 'css')}" />

    <h1>${appConfig.name}</h1>
    <p>
      You here already for <span id="counter">0</span> sec.
    </p>

    <script src="${entryPath('web', 'js')}"></script>
  </body>
</html>
`.trim()
}
