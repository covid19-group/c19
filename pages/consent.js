import ReactMarkdown from 'react-markdown';
import PageLayout from '../components/PageLayout';
import { useContext } from 'react';
import consent from '../content/consent';
import { LanguageContext } from '../components/LanguageSelector';

export default function Consent() {
  const { language } = useContext(LanguageContext);
  const content = consent[language];
  return (
    <PageLayout>
      <ReactMarkdown source={content} className="react-markdown pb-20" />
    </PageLayout>
  );
}
