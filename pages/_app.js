import '../styles.css';
import { LanguageProvider } from '../components/LanguageSelector';

export default function App({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
