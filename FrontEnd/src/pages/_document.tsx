import Document, {Html, Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document{
    render() {
        return (
          <Html lang="en" translate="no">
            <Head>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='TRUE'/>
              <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
              <title>NG.CASH</title>
            </Head>
            <body>
              <Main />
              <NextScript />
            </body>
          </Html>
        );
      }
}