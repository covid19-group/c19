import { useState, useRef, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { InputWithFix, Checkbox } from './Form';
import { AsYouType, parsePhoneNumberFromString, isValidNumber } from 'libphonenumber-js';
import flag from 'country-code-emoji';
import Link from 'next/link';
import { LanguageContext } from './LanguageSelector';
import LoadingSpinner from './LoadingSpinner';
import authContent from '../content/authForm';

export default function AuthForm({ children }) {
  const router = useRouter();
  const { language } = useContext(LanguageContext);

  const codeInputRef = useRef({});
  const submitBtnRef = useRef(null);

  const [phoneError, setPhoneError] = useState(false);
  const [authError, setAuthError] = useState(false);

  const [authorized, setAuthorized] = useState(false);
  const [authorizing, setAuthorizing] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [renewing, setRenewing] = useState(0);

  useEffect(() => {
    if (authorized) {
      setRenewing(5);
      setTimeout(() => {
        setAuthorized(false);
      }, 5000);
    }
  }, [authorized]);

  useEffect(() => {
    if (renewing) {
      setTimeout(() => {
        setRenewing(renewing - 1);
      }, 1000);
    } else {
      setPhoneError(false);
    }
  }, [renewing]);

  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [reminders, setReminders] = useState(true);

  const [focused, setFocused] = useState(false);

  const asYouTypeParser = new AsYouType();
  const codeIsComplete = code.length === 6;
  const phoneIsValid = phone && isValidNumber(phone);
  const parsedPhone = parsePhoneNumberFromString(phone);
  const error = phoneError || (phone.length && !focused && (!parsedPhone || !parsedPhone.country || !phoneIsValid));

  const content = authContent[language];

  const verify = async (phone, code, reminders) => {
    setVerifying(true);
    const response = await fetch('/api/post/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone,
        code,
        reminders,
      }),
    });
    if (response.ok) {
      const { id } = await response.json();
      router.push('/' + id);
    } else {
      setVerifying(false);
      setAuthError(content.btn.error);
    }
  };

  const environment = process.browser
    ? origin.includes('c19.dk')
      ? 'production'
      : origin.includes('now.sh')
      ? 'staging'
      : 'development'
    : process.env.NODE_ENV;

  // TODO: don't overwrite with true
  const showTestButton = true || environment !== 'production';

  return (
    <form className="sm:mx-auto sm:w-full max-w-sm sm:px-8 sm:shadow-lg sm:border sm:border-gray-100 sm:rounded-lg sm:py-8 sm:mb-4 mt-4 lg:-mt-12">
      {showTestButton && (
        <button
          onClick={async e => {
            e.preventDefault();
            setPhone('+4599999999');
            setCode('000000');
            verify('+4599999999', '000000', true);
          }}
          className="ml-auto mb-6 bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-600 px-3 py-2 rounded-md w-full">
          {content.testBtn}
        </button>
      )}
      <div className={'bg-white z-50' + (showTestButton ? ' opacity-25' : '')}>
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
              <span className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={async e => {
                    setAuthorizing(true);
                    e.preventDefault();
                    if (authorizing || authorized) {
                      setPhoneError(content.phone.error.wait);
                    } else if (!phone || !isValidNumber(phone)) {
                      setPhoneError(content.phone.error.incomplete);
                    } else {
                      const response = await fetch('/api/post/authorize', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          phone: parsePhoneNumberFromString(phone).number,
                          language,
                        }),
                      });
                      if (response.ok) {
                        setPhoneError(false);
                        setAuthorized(true);
                      } else {
                        setPhoneError(content.phone.error.unknown);
                      }
                    }
                    setAuthorizing(false);
                  }}
                  className={
                    'relative py-2 px-4 mt-1 ml-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-500 hover:text-gray-400 focus:outline-none focus:border-indigo-300 focus:shadow-outline-blue transition duration-150 ease-in-out'
                  }>
                  <LoadingSpinner
                    color="blue"
                    size={16}
                    className={authorizing ? 'absolute inset-0 h-full flex items-center' : 'hidden'}
                  />
                  <span className={'flex flex-1 flex-no-wrap' + (authorizing ? ' invisible' : '')}>
                    {authorized ? (
                      <>
                        <span className="hidden sm:inline-block mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        {content.phone.btn.sent}{' '}
                      </>
                    ) : (
                      <>
                        {content.phone.btn.send}{' '}
                        <span className="hidden sm:inline-block ml-1">{content.phone.btn.code}</span>
                      </>
                    )}
                  </span>
                </button>
              </span>
            </div>
            {!!error && (
              <p className="mt-2 text-xs font-normal text-red-600">
                {phoneError ||
                  (!parsedPhone || !parsedPhone.country
                    ? content.phone.error.missingCountryCode
                    : content.phone.error.invalid)}
                {!!renewing && renewing + ' ' + content.phone.error.secs}
              </p>
            )}
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
                  onPaste={e => {
                    e.preventDefault();
                    const paste = (e.clipboardData || window.clipboardData).getData('text');
                    setCode(paste.replace('c19.dk', '').replace(/\D/g, ''));
                  }}
                  onChange={e => {
                    const value = e.target.value;
                    setCode(
                      [...code]
                        .filter((val, index) => index < idx)
                        .concat(value)
                        .join('')
                    );
                    const nextField = codeInputRef.current[idx + 1];
                    idx !== 5 && nextField ? nextField.focus() : setTimeout(() => submitBtnRef.current.focus(), 100);
                  }}
                  value={[...code][idx] || ''}
                  ref={input => (codeInputRef.current[idx] = input)}
                  className={`form-input relative block w-full rounded-none ${
                    idx === 0 ? 'rounded-l-md ' : idx === 5 ? 'rounded-r-md ' : ''
                  }bg-transparent transition text-center ease-in-out duration-150 sm:text-sm sm:leading-5 px-0 sm:px-auto`}
                  placeholder="0"
                />
              </div>
            ))}
            <div className="relative flex items-center justify-center text-sm leading-5 ml-2">
              <button
                disabled={!code.length}
                onClick={e => {
                  e.preventDefault();
                  setCode('');
                  codeInputRef.current[0].focus();
                }}
                className={'text-sm ' + !!code.length ? 'text-indigo-500' : 'text-gray-500'}>
                {content.code.reset}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Checkbox
            label={content.reminders.label}
            checked={reminders}
            onChange={() => setReminders(!reminders)}
            description={content.reminders.description}
          />
        </div>

        <div className="mt-6">
          <span className="block w-full rounded-md shadow-sm">
            <button
              disabled={!(codeIsComplete && phoneIsValid)}
              ref={btn => (submitBtnRef.current = btn)}
              onClick={e => {
                e.preventDefault();
                verify(parsePhoneNumberFromString(phone).number, code, reminders);
              }}
              className={
                'relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium h-10 rounded-md text-white focus:outline-none transition duration-150 ease-in-out ' +
                (phoneIsValid && codeIsComplete
                  ? 'bg-indigo-600 hover:bg-indigo-500 focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700'
                  : 'bg-gray-500 focus:shadow-outline-gray cursor-default')
              }>
              {verifying ? (
                <LoadingSpinner size={16} color="white" className="absolute inset-0 h-full flex items-center" />
              ) : (
                content.btn.label
              )}
            </button>
          </span>
          {authError && <p className="mt-2 text-xs font-normal text-red-600">{authError}</p>}
        </div>
        <p className="mt-3 text-xs leading-5 text-gray-500">
          {content.privacy.prefix}
          <Link href="#">
            <a className="font-medium text-gray-900 underline ml-1">{content.privacy.label}</a>
          </Link>
        </p>
      </div>
    </form>
  );
}
