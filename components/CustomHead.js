import Head from 'next/head';
import content from '../content';
import { useContext } from 'react';
import { LanguageContext } from '../components/LanguageSelector';

export default function CustomHead() {
  const { language } = useContext(LanguageContext);
  const { subtitle, titleBlue, titleBlack } = content[language].hero;
  const title = titleBlue + ' ' + titleBlack;
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" type="image/x-icon" href="https://c19.dk/favicon.ico" />
      <title>{title}</title>
      <meta name="description" content={subtitle} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={subtitle} />
      <meta property="og:image" content="https://c19.dk/og.png" />
      <meta property="og:url" content="https://c19.dk/" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={subtitle} />
      <meta name="twitter:image" content="https://c19.dk/og.png" />
    </Head>
  );
}
