import fetch from 'node-fetch';
import Link from 'next/link';
import { useState, useContext } from 'react';
import { Header, Label, Checkbox, Radio, Input, InputWithFix, Toggle } from '../components/Form';
import PageLayout from '../components/PageLayout';
import ConfirmationModal from '../components/ConfirmationModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { LanguageContext } from '../components/LanguageSelector';
import indexContent from '../content/index';
import successContent from '../content/success';
const R = require('ramda');

function Success() {
  const { language } = useContext(LanguageContext);
  const indexContentLanguage = indexContent[language].hero;
  const successContentLanguage = successContent[language];
  return (
    <PageLayout>
      <div className="flex flex-col pt-8 items-center">
        <h1 className="font-extrabold text-2xl text-gray-800">{successContentLanguage.title}</h1>
        <div className="text-md text-gray-700 mt-2">{successContentLanguage.subtitle}</div>
        <img rel="nofollow" src="/assets/illustrations/messaging.svg" alt="Illustration of SMS" className="h-80 mt-8" />
        <div className="-mt-16 flex items-center text-white bg-teal-500 p-8 rounded-lg">
          <span className="hidden sm:flex p-2 rounded-lg bg-teal-700">
            <svg className="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              />
            </svg>
          </span>
          <div className="sm:ml-4">
            <p className="text-teal-200 mx-1">{indexContentLanguage.share}</p>
            <button
              className="mx-1 font-medium text-white hover:text-teal-100"
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${window.origin}`,
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
                  `http://www.twitter.com/share?text=${indexContentLanguage.subtitle.split('.')[0]}&url=${
                    window.origin
                  }`,
                  'sharer',
                  'toolbar=0,status=0,width=640,height=400'
                )
              }
              target="_twitter"
              className="mx-1 font-medium text-white hover:text-teal-100">
              Twitter
            </button>
            <button
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/shareArticle?url=${window.origin}&title=${
                    indexContentLanguage.subtitle.split('.')[0]
                  }&summary=${indexContentLanguage.titleBlack + ' ' + indexContentLanguage.titleBlue}`,
                  'sharer',
                  'toolbar=0,status=0,width=480,height=560'
                )
              }
              target="_linkedin"
              className="mx-1 font-medium text-white hover:text-teal-100">
              Linkedin
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default Success;
