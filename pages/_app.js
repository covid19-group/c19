import { useContext } from 'react';
import '../styles.css';
import { LanguageProvider } from '../components/LanguageSelector';
import CustomHead from '../components/CustomHead';

export default function App({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <CustomHead />
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
