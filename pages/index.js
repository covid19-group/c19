import PageLayout from '../components/PageLayout';
import RegistrationForm from '../components/RegistrationForm';
import { InputWithDropDown } from '../components/Form';
import Link from 'next/link';
import contentMain from '../content';
import { useContext } from 'react';

export default function Landing() {
  return (
    <PageLayout>
      <Hero />
    </PageLayout>
  );
}

const Hero = ({ language = 'en-US' }) => {
  const content = contentMain[language].hero;
  return (
    <div className="relative bg-white overflow-hidden">
      <div class="mt-8 mx-auto max-w-screen-xl sm:mt-12 md:mt-16 xl:mt-20">
        <div class="lg:grid lg:grid-cols-12 lg:gap-8">
          <div class="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h2 class="mt-1 text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
              {content.titleBlack}
              <br />
              <span class="text-indigo-600">{content.titleBlue}</span>
            </h2>
            <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">{content.subtitle}</p>
            <div class="mt-5 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <p class="text-base font-medium text-gray-900">{content.action}</p>
            </div>
          </div>
          <div class="relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <RegistrationForm />
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
