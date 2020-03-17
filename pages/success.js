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
      <div className="flex flex-col mt-16 items-center">
        <h1 className="text-xl text-gray-800">{successContentLanguage.title}</h1>
        <div className="text-md text-gray-600 mt-2">{successContentLanguage.subtitle}</div>
        <img
          rel="nofollow"
          src="/assets/illustrations/undraw_online_messaging.svg"
          alt="Illustration of SMS"
          className="h-64 mt-8"
        />
        <div className="mt-16 flex">
          <p>{indexContentLanguage.share}</p>
          <button
            className="mx-1 text-indigo-600 hover:text-indigo-700"
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
                `http://www.twitter.com/share?text=${indexContentLanguage.subtitle}&url=${window.location}`,
                'sharer',
                'toolbar=0,status=0,width=640,height=400'
              )
            }
            target="_twitter"
            className="mx-1 text-indigo-600 hover:text-indigo-700">
            Twitter
          </button>
          <button
            onClick={() =>
              window.open(
                `https://www.linkedin.com/shareArticle?url=${window.location}&title=${
                  indexContentLanguage.subtitle
                }&summary=${indexContentLanguage.titleBlack + ' ' + indexContentLanguage.titleBlue}`,
                'sharer',
                'toolbar=0,status=0,width=480,height=560'
              )
            }
            target="_linkedin"
            className="mx-1 text-indigo-600 hover:text-indigo-700">
            Linkedin
          </button>
        </div>
      </div>
    </PageLayout>
  );
}

export default Success;
