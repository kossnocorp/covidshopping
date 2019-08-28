// import { TemplateContext } from 'firebun/config/types'

export default function template({ entryPath }: TemplateContext) {
  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Firebun application</title>
  </head>
  <body>
    <link rel="stylesheet" type="text/css" href="${entryPath('css')}" />
    <p>Hello, world!</p>
    <script src="${entryPath('js')}"></script>
  </body>
</html>
`.trim()
}
