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
      <meta name="og:title" content={title} />
      <meta name="og:site_name" content="Pelion" />
      <meta name="og:description" content={subtitle} />
      <meta name="og:image" content="https://c19.dk/og.png" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={subtitle} />
      <meta name="twitter:image" content="https://c19.dk/og.png" />
    </Head>
  );
}
