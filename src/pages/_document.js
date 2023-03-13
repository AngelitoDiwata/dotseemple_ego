import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <script defer async src="https://platform.twitter.com/widgets.js" />
        <meta name="theme-color" content="#042940" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
