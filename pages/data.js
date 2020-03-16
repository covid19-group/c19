import PageLayout from '../components/PageLayout';
import { useContext } from 'react';
import contentData from '../content/data';
import { LanguageContext } from '../components/LanguageSelector';

export default function Data() {
  const { language } = useContext(LanguageContext);
  const content = contentData[language];
  return (
    <PageLayout>
      <div className="w-full relative overflow-hidden sm:border sm:border-gray-100 sm:shadow-lg sm:rounded-lg overflow-y-hidden">
        <Banner text={content.banner} />
        <div className="min-h-screen -mt-4 relative">
          <iframe
            className="relative min-h-screen"
            src="https://app.powerbi.com/view?r=eyJrIjoiNzI4NDk3NzEtODU0Ny00YTgyLTg0MDEtOThjNDkwYmU5MWY1IiwidCI6ImIyNzIzOWVhLTNhODUtNDU1Yi1hNDJmLTBmZTFjOWY4ZmExMiIsImMiOjl9"
            width="100%"
            height="100%"
            style={{
              background: 'transparent',
              border: 'none',
              top: '37px',
            }}
          />
        </div>
      </div>
    </PageLayout>
  );
}

const Banner = ({ text }) => (
  <div className="bg-indigo-600 rounded-lg sm:border-gray-100">
    <div className="max-w-screen-xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between flex-wrap">
        <div className="w-0 flex-1 flex items-center">
          <span className="flex p-2 rounded-lg bg-indigo-800">
            <svg
              className="h-6 w-6 text-white"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </span>
          <p className="ml-3 font-medium text-white whitespace-wrap">{text}</p>
        </div>
      </div>
    </div>
  </div>
);
