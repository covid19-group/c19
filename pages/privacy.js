import ReactMarkdown from 'react-markdown';
import PageLayout from '../components/PageLayout';
import { useContext } from 'react';
import privacy from '../content/privacy';
import { LanguageContext } from '../components/LanguageSelector';

export default function Consent() {
  const { language } = useContext(LanguageContext);
  const content = privacy[language];
  return (
    <PageLayout>
      <ReactMarkdown source={content} className="react-markdown pb-20" />
    </PageLayout>
  );
}
