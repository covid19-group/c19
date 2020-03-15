import PageLayout from '../components/PageLayout';
import { useState, useRef, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { InputWithFix } from '../components/Form';
import { AsYouType, parsePhoneNumberFromString, isValidNumber } from 'libphonenumber-js';
import flag from 'country-code-emoji';
import Link from 'next/link';
import { LanguageContext } from '../components/LanguageSelector';
import LoadingSpinner from '../components/LoadingSpinner';
import unsubscribeContent from '../content/unsubscribe';

export default function Unsubscribe() {
  const router = useRouter();
  const { language } = useContext(LanguageContext);

  const [phoneError, setPhoneError] = useState(false);
  const [unsubscribeError, setUnsubscribeError] = useState(false);
  const [unsubscribing, setUnsubscribing] = useState(false);
  const [unsubscribed, setUnsubscribed] = useState(false);

  const [phone, setPhone] = useState('');
  const [focused, setFocused] = useState(false);

  const asYouTypeParser = new AsYouType();
  const phoneIsValid = phone && isValidNumber(phone);
  const parsedPhone = parsePhoneNumberFromString(phone);
  const error = phoneError || (phone.length && !focused && (!parsedPhone || !parsedPhone.country || !phoneIsValid));

  const content = unsubscribeContent[language];
  if (unsubscribed) {
    return (
      <PageLayout>
        <div className="sm:mx-auto sm:w-full max-w-sm sm:px-8 sm:shadow-lg sm:border sm:border-gray-100 sm:rounded-lg py-8">
          <h2 className="mb-4">{content.success.label}</h2>
          <p className="block text-gray-500 font-normal text-sm">
            {content.success.description}
            <button
              onClick={() => router.push('/')}
              className="text-sm font-medium text-indigo-500 hover:text-indigo-600 ml-1">
              {content.success.link}
            </button>
          </p>
        </div>
      </PageLayout>
    );
  }
  return (
    <PageLayout>
      <form className="sm:mx-auto sm:w-full max-w-sm sm:px-8 sm:shadow-lg sm:border sm:border-gray-100 sm:rounded-lg sm:py-8 sm:mb-4 mt-4 lg:-mt-4">
        <h2 className="mb-4">{content.title}</h2>
        <div className="w-full">
          <label className="block text-sm font-medium leading-5 text-gray-700">
            {content.phone.label}
            <span className="block text-gray-500 font-normal text-xs">{content.phone.description}</span>
            <div className="-mt-px w-full flex">
              <InputWithFix
                suffix={
                  phoneIsValid && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  )
                }
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                prefix={parsedPhone && parsedPhone.country ? flag(parsedPhone.country) : '🌍'}
                type="phone"
                value={asYouTypeParser.input(phone)}
                onChange={({ value }) => {
                  phoneError && setPhoneError(false);
                  setPhone(value);
                }}
                placeholder="+45 60 55 07 09"
              />
            </div>
            {!!error && (
              <p className="mt-2 text-xs font-normal text-red-600">
                {phoneError ||
                  (!parsedPhone || !parsedPhone.country
                    ? content.phone.error.missingCountryCode
                    : content.phone.error.invalid)}
              </p>
            )}
          </label>
        </div>
        <div className="mt-6">
          <span className="block w-full rounded-md shadow-sm">
            <button
              disabled={!phoneIsValid}
              onClick={async e => {
                setUnsubscribing(true);
                e.preventDefault();
                const response = await fetch('/api/post/unsubscribe', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ phone }),
                });
                if (response.ok) {
                  setUnsubscribed(true);
                  setUnsubscribing(false);
                } else {
                  setUnsubscribing(false);
                  setUnsubscribeError(content.btn.error);
                }
              }}
              className={
                'relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium h-10 rounded-md text-white focus:outline-none transition duration-150 ease-in-out ' +
                (phoneIsValid
                  ? 'bg-indigo-600 hover:bg-indigo-500 focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700'
                  : 'bg-gray-500 focus:shadow-outline-gray cursor-default')
              }>
              {unsubscribing ? (
                <LoadingSpinner size={16} color="white" className="absolute inset-0 h-full flex items-center" />
              ) : (
                content.btn.label
              )}
            </button>
          </span>
          {unsubscribeError && <p className="mt-2 text-xs font-normal text-red-600">{unsubscribeError}</p>}
        </div>
      </form>
    </PageLayout>
  );
}
