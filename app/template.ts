import { entryPath } from 'firebun/server/template'
import config from '#app/config'

export default function template({
  html,
  title,
  description,
  canonical
}: {
  html: string
  title: string
  description: string
  canonical?: string
}) {
  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name='description' content="${description}">${
    !canonical ? '' : `<link rel="canonical" href="${canonical}" />`
  }

    <meta name='viewport' content='width=device-width, initial-scale=1.0'>

    <!-- Social meta tags -->

    <!-- Twitter -->
    <meta name='twitter:card' content='summary_large_image'>
    <meta name='twitter:creator' content='@kossnocorp'>
    <meta name='twitter:title' content="${title}">
    <meta name='twitter:description' content="${description}">
    <meta name='twitter:image' content='http://covid.shopping/card.png'>

    <!-- Facebook -->
    <meta property='og:type' content='website'>
    <meta property='og:title' content="${title}">
    <meta property='og:description' content="${description}">
    <meta property='og:image' content='http://covid.shopping/card.png'>
    <meta property='og:image:width' content='1200'>
    <meta property='og:image:height' content='628'>

    <!-- Favicons -->
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Inter:400,700&display=swap&subset=cyrillic,latin-ext" rel="stylesheet">
    ${
      config.gtag
        ? `

    <!-- GTag -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${
      config.gtag.ga
    }"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      ${config.gtag.ga ? `gtag('config', '${config.gtag.ga}');` : ''}
      ${config.gtag.ads ? `gtag('config', '${config.gtag.ads}');` : ''}
      ${config.gtag.app ? `gtag('config', '${config.gtag.app}');` : ''}
    </script>`
        : ''
    }
  </head>
  <body>
    <link rel="stylesheet" type="text/css" href="${entryPath('web', 'css')}" />
    ${html}
    <script src="${entryPath('web', 'js')}"></script>
    <link rel="stylesheet"
      href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/default.min.css">
  </body>
</html>
`.trim()
}
