import { useState, createContext, useContext } from 'react';
import flag from 'country-code-emoji';
import content from '../content/language';

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('da-DK');

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export default function LanguageSelector() {
  const [show, setShow] = useState(false);
  const { language, setLanguage } = useContext(LanguageContext);
  const NameFlag = ({ name, flag }) => (
    <>
      <span className="mr-1">{flag}</span>
      {name}
    </>
  );
  return (
    <LanguageProvider>
      <div className="relative inline-block text-left">
        <div onClick={() => setShow(true)}>
          <span className="rounded-md shadow-sm">
            <button className="text-left inline-flex justify-center w-32 rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-indigo-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
              <NameFlag {...content[language]} />
              <svg className="-mr-1 ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </span>
        </div>
        {show && (
          <>
            <div
              onClick={() => setShow(false)}
              className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
              <div>
                <div className="absolute inset-0 bg-transparent"></div>
              </div>
            </div>
            <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg">
              <div className="rounded-md bg-white shadow-xs">
                <div className="py-1">
                  {Object.keys(content).map(i18n => (
                    <button
                      onClick={() => {
                        setLanguage(i18n);
                        setShow(false);
                        window.localStorage.setItem('i18n', i18n);
                      }}
                      className="text-left w-full block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
                      <NameFlag {...content[i18n]} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </LanguageProvider>
  );
}
