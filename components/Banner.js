import bannerConent from '../content/banner';
import { useContext } from 'react';
import { LanguageContext } from '../components/LanguageSelector';

export default function Banner() {
  const { language } = useContext(LanguageContext);
  const content = bannerConent[language];
  return (
    <div className="fixed inset-x-0 bottom-0">
      <div className="bg-teal-500">
        <div className="max-w-screen-xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg bg-teal-700">
                <svg className="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
              </span>
              <p className="ml-3 font-medium text-white break-words">{content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
