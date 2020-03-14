import PageLayout from '../components/PageLayout';
import { InputWithDropDown } from '../components/Form';
import Link from 'next/link';
import contentMain from '../content';
import { useContext } from 'react';
import { ModalContext } from '../components/Modal';

export default function Landing() {
  return (
    <PageLayout>
      <Hero />
      <Explanation />
    </PageLayout>
  );
}

const Hero = ({ language = 'en-US' }) => {
  const content = contentMain[language].hero;
  const showModal = useContext(ModalContext);
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="relative py-4 sm:py-8 md:py-16 lg:py-24">
        <div className="mx-auto max-w-xl lg:max-w-screen-xl">
          <div className="sm:text-center md:mx-auto lg:text-left">
            <h2 className="mt-1 text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
              {content.titleBlack}
              <br />
              <span className="text-indigo-600">{content.titleBlue}</span>
            </h2>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">{content.subtitle}</p>
            <div className="mt-5 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <p className="text-base font-medium text-gray-900">{content.action}</p>
              <button
                onClick={e => showModal()}
                className="mt-1 sm:mt-4 w-full px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-800 shadow-sm hover:bg-gray-700 focus:outline-none focus:shadow-outline active:bg-gray-900 transition duration-150 ease-in-out sm:mt-0 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto">
                {content.button}
              </button>
              <p className="mt-3 text-sm leading-5 text-gray-500">
                {content.privacy.value}
                <Link href={content.privacy.link.href}>
                  <a className="font-medium text-gray-900 underline">{content.privacy.link.label}</a>
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Explanation = ({ language = 'en-US' }) => {
  const content = contentMain[language].explanation;
  return (
    <div className="pb-12 pt-4 bg-white">
      <div className="max-w-xl mx-auto lg:max-w-screen-xl">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {Object.keys(content).map(key => {
            const { title, description } = content[key];
            const icons = {
              1: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
              2: [
                <path key="1" d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />,
                <path key="2" d="M13.73 21a2 2 0 0 1-3.46 0" />,
              ],
              3: [
                <line key="1" x1="18" y1="20" x2="18" y2="10" />,
                <line key="2" x1="12" y1="20" x2="12" y2="4" />,
                <line key="3" x1="6" y1="20" x2="6" y2="14" />,
              ],
            };
            const Icon = props => <svg {...props}> {icons[key]}</svg>;
            return (
              <div key={key} className="mt-10 lg:mt-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <Icon
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </div>
                <div className="mt-5">
                  <h5 className="text-lg leading-6 font-medium text-gray-900">{title}</h5>
                  <p className="mt-2 text-base leading-6 text-gray-500">{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
