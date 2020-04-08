import { useState, useRef, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { InputWithFix, Checkbox } from './Form';
import { AsYouType, parsePhoneNumberFromString, isValidNumber } from 'libphonenumber-js';
import flag from 'country-code-emoji';
import Link from 'next/link';
import { LanguageContext } from './LanguageSelector';
import LoadingSpinner from './LoadingSpinner';
import authContent from '../content/authForm';
import bannerContent from '../content/banner';

export default function AuthForm({ children }) {
  const { language } = useContext(LanguageContext);
  const content = authContent[language];
  return (
    <form className="sm:mx-auto sm:w-full max-w-sm sm:px-8 sm:border sm:border-gray-200 sm:rounded-lg sm:py-8 sm:mb-4 mt-4 lg:-mt-12">
      <div className="bg-white z-50 opacity-25">
        <div className="w-full">
          <label className="block text-sm font-medium leading-5 text-gray-700">
            {content.phone.label}
            <span className="block text-gray-500 font-normal text-xs">{content.phone.description}</span>
            <div className="-mt-px w-full flex">
              <InputWithFix
                disabled
                prefix={'+45'} //parsedPhone && parsedPhone.country ? flag(parsedPhone.country) : '🌍'}
                type="phone"
                placeholder="60 55 07 09"
              />
              <span className="inline-flex rounded-md shadow-sm">
                <button
                  disabled
                  className={
                    'relative py-2 px-4 mt-1 ml-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:text-gray-800 focus:outline-none focus:border-teal-500 focus:shadow-outline transition duration-150 ease-in-out'
                  }>
                  <span className={'flex flex-1 flex-no-wrap'}>
                    {content.phone.btn.send}{' '}
                    <span className="hidden sm:inline-block ml-1">{content.phone.btn.code}</span>
                  </span>
                </button>
              </span>
            </div>
          </label>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium leading-5 text-gray-700 mb-1">
            {content.code.label}
            <span className="block text-gray-500 font-normal text-xs">{content.code.description}</span>
          </label>
          <div className="-mt-px flex">
            {[0, 1, 2, 3, 4, 5].map(idx => (
              <div key={idx} className="-ml-px flex-1 min-w-0 z-30">
                <input
                  maxLength="1"
                  type="number"
                  disabled
                  className={`form-input relative block w-full rounded-none ${
                    idx === 0 ? 'rounded-l-md ' : idx === 5 ? 'rounded-r-md ' : ''
                  }bg-transparent transition text-center ease-in-out duration-150 sm:text-sm sm:leading-5 px-0 sm:px-auto`}
                  placeholder="0"
                />
              </div>
            ))}
            <div className="relative flex items-center justify-center text-sm leading-5 ml-2">
              <button disabled className={'text-sm text-gray-500'}>
                {content.code.reset}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Checkbox
            label={content.reminders.label}
            onChange={() => null}
            disabled
            checked
            description={<p className="text-xs leading-5 text-gray-500">{content.reminders.description}</p>}
          />
          <Checkbox
            label={
              <>
                {content.consent.label}
                <span className="font-normal"> ({content.required})</span>
              </>
            }
            onChange={() => null}
            disabled
            checked={false}
            description={
              <p className="text-xs leading-5 text-gray-500">
                {content.consent.description}
                <Link href="/privacy">
                  <a className="font-medium text-gray-900 underline">{content.consent.privacy}</a>
                </Link>
              </p>
            }
          />
        </div>
        <div className="mt-6">
          <span className="block w-full rounded-md shadow-sm">
            <button
              disabled
              className={
                'relative w-full flex justify-center py-2 px-4 bg-teal-500 border border-transparent text-sm font-medium h-10 rounded-md text-white focus:outline-none transition duration-150 ease-in-out opacity-50 focus:shadow-none cursor-default'
              }>
              {content.btn.label}
            </button>
          </span>
        </div>
      </div>
    </form>
  );
}
