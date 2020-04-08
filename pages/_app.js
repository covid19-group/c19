import { useContext } from 'react';
import '../styles.css';
import { LanguageProvider } from '../components/LanguageSelector';
import CustomHead from '../components/CustomHead';
import Banner from '../components/Banner';
import Modal from '../components/Modal';

export default function App({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <CustomHead />
      <Component {...pageProps} />
      <Modal />
      <Banner />
    </LanguageProvider>
  );
}
