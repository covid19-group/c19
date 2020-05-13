import PageLayout from '../components/PageLayout';
import AuthForm from '../components/AuthForm';
import { InputWithDropDown } from '../components/Form';
import Link from 'next/link';
import contentMain from '../content';
import { useContext } from 'react';
import { LanguageContext } from '../components/LanguageSelector';
import ReactMarkdown from 'react-markdown';

function Landing() {
  const environment = process.browser
    ? origin.includes('c19.dk')
      ? 'production'
      : origin.includes('now.sh')
      ? 'staging'
      : 'development'
    : process.env.NODE_ENV;

  return (
    <PageLayout>
      <Hero />
    </PageLayout>
  );
}

export default Landing;

const Hero = () => {
  const { language } = useContext(LanguageContext);
  const content = contentMain[language].hero;
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="mt-8 mx-auto max-w-screen-xl sm:mt-12 md:mt-16 xl:mt-20 pb-24 lg:pb-0">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h2 className="mt-1 text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
              <span style={{ transform: 'translateY(-0.075em)' }} className="inline-block text-teal-400">
                [
              </span>
              {content.titleBlack}
              <span style={{ transform: 'translateY(-0.075em)' }} className="inline-block text-teal-400">
                ]
              </span>
              <br />
              <span className="text-teal-500">{content.titleBlue}</span>
            </h2>
            <p className="mt-3 text-base text-gray-700 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              <ReactMarkdown
                className="react-markdown"
                source={content.subtitle.replace('{count}', language === 'da-DK' ? '32.531' : '32,531')}
              />
            </p>

            <div className="mt-5 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <p className="text-base font-medium text-gray-900">{content.action}</p>
            </div>

            <div className="flex sm:justify-center lg:justify-start mt-5 pb-12">
              <p>{content.share}</p>
              <button
                className="mx-1 font-medium text-teal-500 hover:text-teal-600"
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${window.location}`,
                    'sharer',
                    'toolbar=0,status=0,width=560,height=640'
                  )
                }
                target="_facebook">
                Facebook
              </button>
              <button
                onClick={() =>
                  window.open(
                    `http://www.twitter.com/share?text=${content.subtitle.split('.')[0]}&url=${window.location}`,
                    'sharer',
                    'toolbar=0,status=0,width=640,height=400'
                  )
                }
                target="_twitter"
                className="mx-1 font-medium text-teal-500 hover:text-teal-600">
                Twitter
              </button>
              <button
                onClick={() =>
                  window.open(
                    `https://www.linkedin.com/shareArticle?url=${window.location}&title=${
                      content.subtitle.split('.')[0]
                    }&summary=${content.titleBlack + ' ' + content.titleBlue}`,
                    'sharer',
                    'toolbar=0,status=0,width=480,height=560'
                  )
                }
                target="_linkedin"
                className="mx-1 font-medium text-teal-500 hover:text-teal-600">
                Linkedin
              </button>
            </div>
          </div>
          <div className="relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <AuthForm />
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
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
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
